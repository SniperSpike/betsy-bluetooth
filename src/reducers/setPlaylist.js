const setPlaylist = (state = [], action) => {
  switch (action.type) {
    case "setPlaylist":
      return action.payload;
    default:
      return state;
  }
};

export default setPlaylist;
