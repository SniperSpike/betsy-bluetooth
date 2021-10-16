export const setSong = (video) => {
  return {
    type: "setVideoId",
    payload: video,
  };
};

export const setMediaPlayer = (event) => {
  return {
    type: "setMediaPlayer",
    payload: event,
  };
};

export const isPaused = (pause) => {
  return {
    type: "isPaused",
    payload: pause,
  };
};

export const isPausedToggle = (pause) => {
  return {
    type: "isPausedToggle",
    payload: pause,
  };
};

export const showVideo = () => {
  return {
    type: "showVideo",
  };
};

export const setToken = (payload) => {
  return {
    type: "setToken",
    payload,
  };
};

export const setSearchValue = (payload) => {
  return {
    type: "setSearchValue",
    payload,
  };
};

export const isAddingSong = (payload) => {
  return {
    type: "isAddingSong",
    payload,
  };
};

export const isAddingSongToggle = (payload) => {
  return {
    type: "isAddingSong",
    payload,
  };
};

export const setUser = (payload) => {
  return {
    type: "setUser",
    payload,
  };
};

export const setSearchResults = (payload) => {
  return {
    type: "setSearchResults",
    payload,
  };
};

export const setPlaylist = (payload) => {
  return {
    type: "setPlaylist",
    payload,
  };
};

export const setIsShuffled = (payload) => {
  return {
    type: "setIsShuffled",
    payload,
  };
};

export const setIsLooping = (payload) => {
  return {
    type: "setIsLooping",
    payload,
  };
};

export const setColorPalette = (payload) => {
  return {
    type: "setColorPalette",
    payload,
  };
};