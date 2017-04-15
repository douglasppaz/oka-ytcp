import fs from 'fs-extra';
import os from 'os';
import { defaults } from 'lodash';
import Queue from 'promise-queue';

import packageInfo from '../../package.json';

const CONFIG_PATH = './config.json';
const updateConfigFileQueue = new Queue(1, Infinity);
const defaultConfig = {
  name: packageInfo.name,
  version: packageInfo.version,
  videosPath: `${os.homedir()}/OKaVideos`
};

let currrentConfig = null;

/**
 * Verifica se o videosPath existe, se não, cria
 * @param config
 * @returns {*}
 */
const checkVideosPath = (config) => {
  fs.ensureDirSync(config.videosPath);
  return config;
};

/**
 * Carrega configurações do arquivo CONFIG_PATH
 * @returns {Promise.<T>}
 */
const loadCurrentConfig = () => {
  currrentConfig = fs.readJsonSync(CONFIG_PATH);
  return Promise.resolve(currrentConfig);
};

/**
 * Atualiza o arquivo de configuração
 * @param config
 */
const updateConfigFile = (config) => new Promise((resolve, reject) => {
  fs.writeJson(CONFIG_PATH, config, (err) => {
    if (err) return reject(err);
    return resolve();
  });
});

/**
 * Atualiza as configurações do servidor
 * @param newConfig
 * @returns {Promise.<T>}
 */
export const updateConfig = newConfig => {
  currrentConfig = defaults(newConfig, currrentConfig);
  const currrentConfigCopy = currrentConfig;
  updateConfigFileQueue.add(() => updateConfigFile(currrentConfigCopy));
  return Promise.resolve(currrentConfig);
};

/**
 * Carrega as configurações do servidor
 * @returns {Promise.<TResult>}
 */
export const loadConfig = () => {
  if (!fs.existsSync(CONFIG_PATH)) return updateConfig(defaultConfig).then(checkVideosPath);
  if (!currrentConfig) return loadCurrentConfig().then(checkVideosPath);
  return Promise.resolve(currrentConfig).then(checkVideosPath);
};

/**
 * Retorna a configuração atual do servidor
 * @returns {*}
 */
export const current = () => {
  if (!currrentConfig) return loadConfig();
  return Promise.resolve(currrentConfig);
};
