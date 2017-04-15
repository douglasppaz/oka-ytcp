import { get } from 'lodash';

let observers = [];

/**
 * Executa quando a configuração é atualizado
 * @param prev
 * @param current
 */
export const configChanged = (prev, current) => {
  observers.forEach((observer) => {
    const { path, update } = observer;
    const currentPathSnap = get(current, path);
    if (get(prev, path) !== currentPathSnap) {
      update(currentPathSnap);
    }
  });
};

/**
 * Adiciona observer em config
 * @param path
 * @param update
 */
export const addConfigObserver = (path, update) => observers
  .push({ path, update });
