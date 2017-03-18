import { map } from 'lodash';

export const get = (ids) => Promise.all(map(ids), () => {
  return Promise.resolve();
});
