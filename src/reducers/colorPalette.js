const colorPalette = (state = [], action) => {
  switch (action.type) {
    case "setColorPalette":
      return action.payload;
    default:
      return state;
  }
};

export default colorPalette;
