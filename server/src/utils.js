import { findKey } from 'lodash';
import path from 'path';

import errosCode from './errorsCode.json';


/**
 * Retorna HTTP response
 * @param res
 * @param object
 * @constructor
 */
export const JsonResponse = (res, object) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify(object));
};

/**
 * Retorna label do error code
 * @param code
 */
export const getErrorLabel = (code) => findKey(errosCode, v => v == code);


/**
 * Cria objeto para enviar pelo web socket
 * @param type
 * @param payload
 */
export const wsMessageObject = (type, payload) => JSON.stringify({ type, payload });

/**
 * Verifica se o arquivo é .oka
 * @param filename
 */
export const isOkaFilename = filename => path.extname(filename) === '.oka';

/**
 * Envia mensagem para todos os clientes conectados ao WS
 * @param msg
 * @param wsApp
 */
export const wsBroadcast = (msg, wsApp) => wsApp.clients.forEach(client => client.send(msg));
