const selectedPlaylist = (state = [], action) => {
  switch (action.type) {
    case "selectedPlaylist":
      return action.payload;
    default:
      return state;
  }
};

export default selectedPlaylist;
