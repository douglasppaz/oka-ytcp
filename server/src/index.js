import express from 'express';
import { keys, map } from 'lodash';
import expressWs from 'express-ws';

import packageInfo from '../../package.json';
import { SERVER_PORT } from '../../constants.json';

import {
  JsonResponse,
  getErrorLabel,
  wsMessageObject,
  wsBroadcast,
} from './utils';
import { loadConfig } from './config';
import { download } from './getVideo';
import { listVideos, watchIn } from './manager';
import { addConfigObserver } from './configObserver';

import constants from '../../constants.json';

const { REDUX_ACTIONS_TYPES: { updateAllVideos } } = constants;


/**
 * Configurações do servidor HTTP
 */
const app = express();
const wsApp = expressWs(app).getWss();

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};

app.use(allowCrossDomain);

app.get('/', (req, res) => {
  JsonResponse(res, {
    name: packageInfo.name,
    version: packageInfo.version
  });
});

app.get('/v/', (req, res) => {
  download(keys(req.query))
    .then(list => JsonResponse(res, { infos: map(list, (item) => item.info) }))
    .catch(error => JsonResponse(res, {
      error,
      errorLabel: getErrorLabel(error.code),
    }));
});

app.ws('/', (ws) => {
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
 * Carregando configurações, assistindo arquivos e rodando servidor
 */
loadConfig()
  .then(config => watchIn(config.videosPath, wsApp))
  .then(() => addConfigObserver(
    'videosPath',
    (videosPath) => watchIn(videosPath, wsApp)))
  .then(() => addConfigObserver(
    'videosPath',
    () => listVideos()
      .then(videos => wsBroadcast(
        wsMessageObject(
          updateAllVideos,
          { videos }), wsApp))))
  .then(runServer)
  .catch(console.error);
