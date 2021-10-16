const isShuffled = (state = false, action) => {
  switch (action.type) {
    case "setIsShuffled":
      return !state;
    default:
      return state;
  }
};

export default isShuffled;
