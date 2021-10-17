const volumeReducer = (state = 0.3, action) => {
  switch (action.type) {
    case "setVolume":
      return action.payload;
    default:
      return state;
  }
};

export default volumeReducer;
