import { listVideos } from '../src/manager';

describe('manager.listVideos()', () => {
  it('teste simples', (done) => {
    listVideos()
      .then((videos) => done());
  });
});
