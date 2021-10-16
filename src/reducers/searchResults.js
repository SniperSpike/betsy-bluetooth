const setSearchResults = (state = [], action) => {
  switch (action.type) {
    case "setSearchResults":
      return action.payload;
    default:
      return state;
  }
};

export default setSearchResults;
