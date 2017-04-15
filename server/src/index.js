import express from 'express';
import { keys, map } from 'lodash';
import expressWs from 'express-ws';

import packageInfo from '../../package.json';
import { SERVER_PORT } from '../../constants.json';

import { JsonResponse, getErrorLabel, wsMessageObject } from './utils';
import { loadConfig } from './config';
import { download } from './getVideo';
import { listVideos } from './manager';
import { watchIn } from './watchOkaFiles';
import { addConfigObserver } from './configObserver';

import constants from '../../constants.json';

const { REDUX_ACTIONS_TYPES: { updateAllVideos } } = constants;


/**
 * Configurações do servidor HTTP
 */
const app = express();
const wsApp = expressWs(app);

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
  .then(runServer)
  .catch(console.error);
