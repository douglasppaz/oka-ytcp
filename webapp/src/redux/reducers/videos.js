const initialState = null;

import constants from '../../../../constants.json';

const { REDUX_ACTIONS_TYPES: { updateAllVideos } } = constants;


export default (state = initialState, action) => {
  switch (action.type) {
    case updateAllVideos:
      return action.payload.videos;
    default:
      return state;
  }
  return state;
}
