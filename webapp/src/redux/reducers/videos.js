import findIndex from 'lodash-es/findIndex';


import constants from '../../../../constants.json';
const { REDUX_ACTIONS_TYPES: {
  updateAllVideos,
  addVideo,
  changeVideo,
} } = constants;

const initialState = [];


export default (state = initialState, action) => {
  switch (action.type) {
  case updateAllVideos: {
    return action.payload.videos;
  }
  case addVideo: {
    state.push(action.payload.info);
    return state;
  }
  case changeVideo: {
    const { info } = action.payload;
    state[findIndex(state, i => i.id === info.id)] = info;
    return state;
  }
  default:
    return state;
  }
};
