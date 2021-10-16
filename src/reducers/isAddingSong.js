const isAddingSong = (state = false, action) => {
  switch (action.type) {
    case "isAddingSong":
      return !state;
    case "isAddingSongToggle":
      if (action.payload === true) return true;
      if (action.payload === false) return false;
      break;
    default:
      return state;
  }
};

export default isAddingSong;
