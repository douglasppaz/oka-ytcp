import { get, download } from '../src/getVideo';
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

  describe('Baixar vídeo com ID válido', () => {
    const validId = 'OVo2b6etaOM';

    let video;

    it('carregando configurações', (done) => {
      loadConfig().then(() => done());
    });

    it('adicionar vídeo na lista de downloads', (done) => {
      video = get(validId)
        .then(() => done())
        .catch(() => done(new Error('Nâo foi possível adicionar o vídeo na lista de downloads')));
    });

    it('baixando...', (done) => {
      video.then(() => {
        download(validId)
          .then(() => done());
      });
    });
  });
});
