const isPaused = (state = true, action) => {
  switch (action.type) {
    case "isPaused":
      return !state;
    case "isPausedToggle":
      if (action.payload === true) return true;
      if (action.payload === false) return false;
      break;
    default:
      return state;
  }
};

export default isPaused;
