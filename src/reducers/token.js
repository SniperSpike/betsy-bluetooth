const tokenReducer = (state = "", action) => {
  switch (action.type) {
    case "setToken":
      return action.payload;
    default:
      return state;
  }
};

export default tokenReducer;
