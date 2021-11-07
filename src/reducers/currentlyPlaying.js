const currentlyPlaying = (state = "", action) => {
  switch (action.type) {
    case "setCurrentlyPlaying":
      return action.payload;
    default:
      return state;
  }
};

export default currentlyPlaying;
