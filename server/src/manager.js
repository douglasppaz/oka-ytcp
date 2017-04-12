import fs from 'fs-extra';
import path from 'path';
import { current } from './config';

export const listVideos = () => current()
  .then((config) => new Promise((resolve, reject) => {
    fs.readdir(config.videosPath, (err, files) => {
      if (err) return reject(err);
      return resolve(files
        .filter(filename => path.extname(filename) === '.oka')
        .map(filename => {
          const filePath = `${config.videosPath}/${filename}`;
          return fs.readJsonSync(filePath);
        }));
    });
  }));
