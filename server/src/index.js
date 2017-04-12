import express from 'express';
import { keys } from 'lodash';
import expressWs from 'express-ws';

import packageInfo from '../../package.json';
import { SERVER_PORT } from '../../constants.json';

import { JsonResponse, getErrorLabel } from './utils';
import { loadConfig } from './config';
import { get } from './getVideo';


/**
 * Configurações do servidor HTTP
 */
const app = express();
const ws = expressWs(app);

app.get('/', (req, res) => {
  JsonResponse(res, {
    name: packageInfo.name,
    version: packageInfo.version
  });
});

app.get('/v/', (req, res) => {
  get(keys(req.query))
    .then(infos => JsonResponse(res, { infos }))
    .catch(code => JsonResponse(res, {
      code,
      label: getErrorLabel(code)
    }));
});

app.ws('/', (ws, req) => {
  ws.send('open');
  // ws.on('message', console.log);
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
  .then(runServer)
  .catch(console.error);
