import fs from 'fs-extra';
import { map, isArray, isString, template } from 'lodash';
import youtubedl from 'youtube-dl';
import Queue from 'promise-queue';

import { current } from './config';

const ytURLTemplate = template('http://www.youtube.com/watch?v=<%= id %>');
const downloadVideoQueue = new Queue(1, Infinity);


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
      if (error) return reject(error.code);

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
  .then(config => Promise.all(map(isArray(ids) ? ids : [ids], (id) => get(id)
    .then(info => {
      downloadVideoQueue.add(() => new Promise((resolve, reject) => {
        const { videosPath } = config;
        const { filename } = info[0];
        const filePath = `${videosPath}/${filename}`;

        let downloaded = fs.existsSync(filePath) ? fs.statSync(filePath).size : 0;

        const v = youtubedl(
          ytURLTemplate({ id }),
          [],
          {
            start: downloaded,
            cwd: videosPath
          }
        );

        v.pipe(fs.createWriteStream(filePath, { flags: 'a' }));

        v.on('end', resolve);
        v.on('error', reject);
      }));
      return info;
    }))));
