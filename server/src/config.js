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

const checkVideosPath = (config) => {
  fs.ensureDirSync(config.videosPath);
  return config;
};

const loadCurrentConfig = () => {
  currrentConfig = fs.readJsonSync(CONFIG_PATH);
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
  if (!fs.existsSync(CONFIG_PATH)) return updateConfig(defaultConfig).then(checkVideosPath);
  if (!currrentConfig) return loadCurrentConfig().then(checkVideosPath);
  return Promise.resolve(currrentConfig).then(checkVideosPath);
};

export const current = () => {
  if (!currrentConfig) return loadConfig();
  return Promise.resolve(currrentConfig);
};
