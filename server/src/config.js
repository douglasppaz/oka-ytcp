import fs from 'fs-extra'
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

const loadCurrentConfig = () => {
  currrentConfig = fs.readJsonSync(CONFIG_PATH);
  fs.ensureDirSync(currrentConfig.videosPath);
  return Promise.resolve(currrentConfig);
};

const updateConfigFile = (config) => new Promise((resolve, reject) => {
  fs.writeJson(CONFIG_PATH, config, (err) => {
    if (err) return reject(err);
    return resolve();
  });
});

export const updateConfig = newConfig => {
  currrentConfig = defaults(newConfig, currrentConfig);
  const currrentConfigCopy = currrentConfig;
  updateConfigFileQueue.add(() => updateConfigFile(currrentConfigCopy));
  return Promise.resolve(currrentConfig);
};

export const loadConfig = () => {
  if (!fs.existsSync(CONFIG_PATH)) return updateConfig(defaultConfig);
  if (!currrentConfig) return loadCurrentConfig();
  return Promise.resolve(currrentConfig);
};

export const current = () => Promise.resolve(currrentConfig);
