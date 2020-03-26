export const darkModeStateReducer = (state = false, { type }) => {
  switch (type) {
    case "CHANGE_MODE":
      return !state;
    default:
      return state;
  }
};
