import fs from 'fs-extra';
import watch from 'watch';

import { current } from './config';
import { isOkaFilename, wsBroadcast, wsMessageObject } from './utils';

import constants from '../../constants.json';
const { REDUX_ACTIONS_TYPES: { addVideo, changeVideo } } = constants;

let monitorStop;

/**
 * Lista todos os vídeos
 */
export const listVideos = () => current()
  .then((config) => new Promise((resolve, reject) => {
    fs.readdir(config.videosPath, (err, files) => {
      if (err) return reject(err);
      return resolve(files
        .filter(isOkaFilename)
        .map(filename => {
          const filePath = `${config.videosPath}/${filename}`;
          return fs.readJsonSync(filePath);
        }));
    });
  }));

/**
 * Assite arquivos .oka na pasta de vídeos
 * @param videosPath
 * @param wsApp
 */
export const watchIn = (videosPath, wsApp) => {
  if (monitorStop) monitorStop();
  watch.createMonitor(videosPath, {
    filter: isOkaFilename,
  }, (monitor) => {
    monitor.on('created', (filepath) => {
      const info = fs.readJsonSync(filepath);
      wsBroadcast(wsMessageObject(addVideo, { info }), wsApp);
    });
    monitor.on('changed', (filepath) => {
      const info = fs.readJsonSync(filepath);
      wsBroadcast(wsMessageObject(changeVideo, { info }), wsApp);
    });
    monitor.on('removed', console.log);

    monitorStop = monitor.stop;
  });
};
