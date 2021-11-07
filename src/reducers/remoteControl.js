const remoteControl = (state = false, action) => {
  switch (action.type) {
    case "setRemoteControl":
      return !state;
    default:
      return state;
  }
};

export default remoteControl;
