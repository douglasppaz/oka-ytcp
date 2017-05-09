import clone from 'lodash-es/clone';


import constants from '../../../../constants.json';
const {
  REDUX_ACTIONS_TYPES: {
    updateAllVideos,
    addVideo,
    changeVideo,
  }
} = constants;

const initialState = {};


export default (state = initialState, action) => {
  switch (action.type) {
  case updateAllVideos: {
    const videosList = action.payload.videos;
    const newState = {};
    videosList.forEach((video) => {
      newState[video.id] = video;
    });
    return newState;
  }
  case addVideo: {
    const videoInfo = action.payload.info;
    state[videoInfo.id] = videoInfo;
    return clone(state);
  }
  case changeVideo: {
    const videoInfo = action.payload.info;
    state[videoInfo.id] = videoInfo;
    return clone(state);
  }
  default:
    return state;
  }
};
