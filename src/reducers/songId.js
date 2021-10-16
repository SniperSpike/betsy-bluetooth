const videoIdReducer = (state = "", action) => {
  switch (action.type) {
    case "setVideoId":
      return action.payload;
    default:
      return state;
  }
};

export default videoIdReducer;
