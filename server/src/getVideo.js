import fs from 'fs-extra';
import { map, isArray, isString, template, defaults } from 'lodash';
import youtubedl from 'youtube-dl';
import Queue from 'promise-queue';

import { current, checkVideosPath } from './config';

const ytURLTemplate = template('http://www.youtube.com/watch?v=<%= id %>');
const downloadVideoQueue = new Queue(1, Infinity);
const updateOkaFileQueue = new Queue(1, Infinity);
const downloading = {};


/**
 * Retorna o caminho do arquivo .oka
 * @param id
 * @returns {Promise.<T>}
 */
const getDotOkaPath = id => current()
  .then((config) => {
    const dotOkaPathTemplate = template(`${config.videosPath}/.<%= id %>.oka`);
    return Promise.resolve(dotOkaPathTemplate({ id }));
  });

/**
 * Cria/atualiza arquivo .oka
 * @param id
 * @param dotOkaPath
 * @returns {Promise.<T>}
 */
const dotOka = (id, dotOkaPath) => new Promise((resolve, reject) => {
  const ytURL = ytURLTemplate({ id });

  youtubedl.getInfo(
    ytURL,
    (error, bruteInfo) => {
      if (error) return reject(error);

      const {
        id,
        extractor,
        _filename,
        fulltitle,
        duration,
        description,
        thumbnail,
      } = bruteInfo;

      const info = {
        id,
        dotOkaPath,
        extractor,
        filename: _filename,
        title: fulltitle,
        duration,
        description,
        thumbnails: [
          {
            type: 'url',
            value: thumbnail
          }
        ],
      };

      fs.writeJsonSync(dotOkaPath, info);
      resolve(info);
    }
  );
});

/**
 * Atualiza infos do .oka
 * @param dotOkaPath
 * @param info
 */
const updateDotOka = (dotOkaPath, info) => updateOkaFileQueue.add(() => new Promise((resolve) => {
  const currentInfo = fs.readJsonSync(dotOkaPath);
  const newInfo = defaults(info, currentInfo);
  fs.writeJsonSync(dotOkaPath, newInfo);
  resolve(newInfo);
}));

/**
 * Adiciona a lista de downloads os vídeos dos IDs recebido no parametro
 * @param ids
 * @returns {Promise.<T>}
 */
export const get = ids => Promise.all(map(isArray(ids) ? ids : [ids], (id) => {
  if (!isString(id)) return Promise.reject(id);
  return getDotOkaPath(id)
    .then((dotOkaPath) => {
      if (!fs.existsSync(dotOkaPath)) return dotOka(id, dotOkaPath);
      return Promise.resolve(fs.readJsonSync(dotOkaPath));
    });
}));

/**
 * Adiciona na lista os videos para download
 * @returns {Promise.<T>}
 * @param ids
 */
export const download = ids => current()
  .then(checkVideosPath)
  .then(config => get(ids)
    .then(infos => {
      return map(infos, (info) => {
        const downloadPromise = downloadVideoQueue.add(() => new Promise((resolve, reject) => {
          const { id, filename, percent, dotOkaPath } = info;

          if (downloading[id]) return reject();
          downloading[id] = true;

          const { videosPath } = config;
          const filePath = `${videosPath}/${filename}`;

          let downloaded = fs.existsSync(filePath) ? fs.statSync(filePath).size : 0;
          let pos = downloaded;
          let size = 0;

          const v = youtubedl(
            ytURLTemplate({ id }),
            [],
            {
              start: downloaded,
              cwd: videosPath
            }
          );

          v.pipe(fs.createWriteStream(filePath, { flags: 'a' }));

          v.on('info', (info) => {
            size = info.size;
          });
          v.on('data', (chunk) => {
            pos += chunk.length;
            if (size) {
              const newPercent = pos / size * 100;
              if (percent - 5 > newPercent || newPercent === 100)
                updateDotOka(dotOkaPath, { percent: newPercent });
            }
          });
          v.on('end', resolve);
          v.on('error', () => {
            downloading[id] = false;
            reject();
          });
        }));
        return { info, downloadPromise };
      });
    }));
