const setPlaylistId = (state = null, action) => {
  switch (action.type) {
    case "setPlaylistId":
      return action.payload;
    default:
      return state;
  }
};

export default setPlaylistId;
