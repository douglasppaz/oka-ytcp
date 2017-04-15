import express from 'express';
import { keys, map } from 'lodash';
import expressWs from 'express-ws';
import watch from 'watch';
import path from 'path';

import packageInfo from '../../package.json';
import { SERVER_PORT } from '../../constants.json';

import { JsonResponse, getErrorLabel, wsMessageObject, isOkaFilename } from './utils';
import { loadConfig } from './config';
import { download } from './getVideo';
import { listVideos } from './manager';

import constants from '../../constants.json';

const { REDUX_ACTIONS_TYPES: { updateAllVideos } } = constants;


/**
 * Configurações do servidor HTTP
 */
const app = express();
const appWs = expressWs(app);

app.get('/', (req, res) => {
  JsonResponse(res, {
    name: packageInfo.name,
    version: packageInfo.version
  });
});

app.get('/v/', (req, res) => {
  download(keys(req.query))
    .then(list => JsonResponse(res, { infos: map(list, (item) => item.info) }))
    .catch(code => JsonResponse(res, {
      code,
      label: getErrorLabel(code)
    }));
});

app.ws('/', (ws, req) => {
  listVideos()
    .then(videos => ws.send(wsMessageObject(updateAllVideos, { videos })));
});

/**
 * Roda o servidor HTTP
 */
const runServer = () => app.listen(SERVER_PORT, () => {
  console.info(`OKa Youtube Cached Player - Server iniciou na porta ${SERVER_PORT}`);
});

/**
 * Carregando configurações e rodando servidor
 */
loadConfig()
  .then((config) => new Promise((resolve) => {
    watch.createMonitor(config.videosPath, (monitor) => {
      const broadcast = msg => appWs.clients.forEach(client => client.send(msg));
      const prepareEvent = w => filename => {
        if (isOkaFilename(filename)) {
          w(path.basename(filename).substr(1, filename.length - 5));
        }
      };

      monitor.on('created', prepareEvent(console.log));
      monitor.on('changed', prepareEvent(console.log));
      monitor.on('removed', prepareEvent(console.log));

      resolve();
    });
  }))
  .then(runServer)
  .catch(console.error);
