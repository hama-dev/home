
export default (state = {}, action) => {
  switch (action.type) {

    case "SET_PLAYER":
      return action.player
   
    default:
      return state;
  }
};
