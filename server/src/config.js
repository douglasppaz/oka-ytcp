import fs from 'fs-extra'
import os from 'os';
import { defaults } from 'lodash';
import Queue from 'promise-queue';

import packageInfo from '../../package.json';

const CONFIG_PATH = './config.json';
const updateConfigFileQueue = new Queue(1, 9999);

let currrentConfig = {};

const updateCurrentConfig = () => {
  currrentConfig = fs.readJsonSync(CONFIG_PATH);
  fs.ensureDirSync(currrentConfig.videosPath);
  return Promise.resolve();
};

const updateConfigFile = (config) => new Promise((resolve, reject) => {
  fs.writeJson(CONFIG_PATH, config, (err) => {
    if (err) return reject(err);
    return updateCurrentConfig()
      .then(resolve, reject);
  });
});

export const updateConfig = newConfig => updateConfigFileQueue.add(() => {
  config = defaults(newConfig, currrentConfig);
  updateConfigFile(config);
});

const checkConfig = () => {
  if (!fs.existsSync(CONFIG_PATH)) {
    const defaultConfig = {
      name: packageInfo.name,
      version: packageInfo.version,
      videosPath: `${os.homedir()}/OKaVideos`
    };
    return updateConfig(defaultConfig);
  }
  return Promise.resolve(currrentConfig);
};

export const loadConfig = () => checkConfig()
  .then(updateCurrentConfig)
  .then(() => console.log('Configurações Carregadas'));

export const current = () => Promise.resolve(currrentConfig);
