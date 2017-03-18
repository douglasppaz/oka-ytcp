import { get } from '../src/getVideo';
import { NOT_FOUND } from '../src/errorsCode.json';

describe('getVideo.get()', () => {
  describe('Parâmetros inválidos', () => {
    // IDs inválidos
    const invalidIds = [
      { label: 'inteiros', value: [1, 2, 3] },
      {
        label: 'vídeo que não existe',
        value: 'abc',
        func: done => (code) => {
          if(code === NOT_FOUND) return done();
          return done(new Error('o vídeo existe'));
        }
      }
    ];

    invalidIds.forEach((invalidId) => {
      it(invalidId.label, (done) => {
        get(invalidId.value)
          .then(() => done(new Error('Parâmetro válido')))
          .catch(invalidId.func ? invalidId.func(done) : () => done());
      });
    });
  });
});
