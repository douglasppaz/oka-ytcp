import watch from 'watch';

import { isOkaFilename } from './utils';


let monitorStop;

export const watchIn = (videosPath, wsApp) => {
  if (monitorStop) monitorStop();
  watch.createMonitor(videosPath, {
    filter: isOkaFilename,
  }, (monitor) => {
    monitor.on('created', console.log);
    monitor.on('changed', console.log);
    monitor.on('removed', console.log);

    monitorStop = monitor.stop;
  });
};
