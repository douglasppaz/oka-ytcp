import { map, isArray, isString } from 'lodash';
import youtubedl from 'youtube-dl';

import { current } from './config';


/**
 * Adiciona a lista de downloads os vídeos dos IDs recebido no parametro
 * @param ids
 */
export const get = (ids) => current().then(config => Promise.all(map(isArray(ids) ? ids : [ids], (id) => {
  if (!isString(id)) return Promise.reject(id);
  return new Promise((resolve, reject) => {
    const ytURL = `http://www.youtube.com/watch?v=${id}`;

    youtubedl.getInfo(
      ytURL,
      (error, info) => {
        if (error) return reject(error.code);
        resolve(info);
      }
    );
  });
})));
