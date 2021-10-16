const searchReducer = (state = "", action) => {
  switch (action.type) {
    case "setSearchValue":
      return action.payload;
    default:
      return state;
  }
};

export default searchReducer;
