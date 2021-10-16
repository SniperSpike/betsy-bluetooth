const isLooping = (state = false, action) => {
  switch (action.type) {
    case "setIsLooping":
      return !state;
    default:
      return state;
  }
};

export default isLooping;
