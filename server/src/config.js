import fs from 'fs-extra'
import os from 'os';
import { defaults } from 'lodash';

import packageInfo from '../../package.json';

const CONFIG_PATH = './config.json';
let currrentConfig = {};

const updateConfigFile = config => new Promise(resolve => {
  fs.writeFile(CONFIG_PATH, JSON.stringify(config), (err) => {
    if (err) return reject(err);
    return resolve();
  });
});

export const updateConfig = (newConfig) => {
  currrentConfig = defaults(newConfig, currrentConfig);
  return updateConfigFile(currrentConfig);
};

const checkConfig = () => {
  if (!fs.existsSync(CONFIG_PATH)) {
    const defaultConfig = {
      name: packageInfo.name,
      version: packageInfo.version,
      videosPath: `${os.homedir()}/OKaVideos/`
    };
    return updateConfig(defaultConfig);
  }
  return Promise.resolve(currrentConfig);
};

export const loadConfig = () => checkConfig()
    .then(() => console.log('Configurações Carregadas'));

export const current = () => Promise.resolve(currrentConfig);
