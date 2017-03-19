import fs from 'fs-extra';
import { map, isArray, isString, template } from 'lodash';
import youtubedl from 'youtube-dl';

import { current } from './config';


/**
 * Retorna o caminho do arquivo .oka
 * @param id
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
 */
const dotOka = (id, dotOkaPath) => new Promise((resolve, reject) => {
  const ytURL = `http://www.youtube.com/watch?v=${id}`;

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
 */
export const get = ids => Promise.all(map(isArray(ids) ? ids : [ids], (id) => {
  if (!isString(id)) return Promise.reject(id);
  return getDotOkaPath(id)
    .then((dotOkaPath) => {
      if (!fs.existsSync(dotOkaPath)) return dotOka(id, dotOkaPath);
      return Promise.resolve(fs.readJsonSync(dotOkaPath));
    });
}));
