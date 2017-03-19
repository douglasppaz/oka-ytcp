import { findKey } from 'lodash';

import errosCode from './errorsCode.json';


/**
 * Retorna HTTP response
 * @param res
 * @param object
 * @constructor
 */
export const JsonResponse = (res, object) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(object));
};

/**
 * Retorna label do error code
 * @param code
 */
export const getErrorLabel = (code) => findKey(errosCode, v => v == code);
