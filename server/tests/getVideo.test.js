import { get } from '../src/getVideo';
import { loadConfig } from '../src/config';
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
          return done(new Error(`o código de erro é ${code}`));
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

  loadConfig()
    .then(() => {
      describe('Baixando vídeo', () => {
        const validId = '841VcS9IxDc';
        let video;

        it('adicionando no vídeo na lista de downloads', (done) => {
          let video = get(validId)
            .then(() => done())
            .catch(() => done(new Error('Nâo foi possível adicionar o vídeo na lista de downloads')));
        });
      });
    });
});
