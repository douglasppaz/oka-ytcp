import request from 'request-promise';

import { SERVER_PORT } from '../../../constants.json';


export const apiRequestUrl = (addr, path = '') => `http://${addr}:${SERVER_PORT}${path}`;

export const downloadVideo = (server, id) => {
  Logger.log('downloadVideo', id);
  request.get(apiRequestUrl(server, `/v/?${id}`))
    .then(Logger.log)
    .catch(Logger.error);
};
