import { map, isArray, isString } from 'lodash';
import youtubedl from 'youtube-dl';


/**
 * Adiciona a lista de downloads os vídeos dos IDs recebido no parametro
 * @param ids
 */
export const get = (ids) => Promise.all(map(isArray(ids) ? ids : [ids], (id) => {
  if (!isString(id)) return Promise.reject(id);
  return new Promise((resolve, reject) => {
    youtubedl.getInfo(`http://www.youtube.com/watch?v=${id}`, (error, info) => {
      if (error) return reject(error.code);
      resolve(info);
    });
  });
}));
