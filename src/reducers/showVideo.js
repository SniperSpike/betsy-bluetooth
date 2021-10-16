const showVideo = (state = false, action) => {
  switch (action.type) {
    case "showVideo":
      return !state;
    default:
      return state;
  }
};

export default showVideo;
