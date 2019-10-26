export default (state = {}, action) => {
  switch (action.type) {
    case "SET_REQUEST":
      return action.request;
      
    default:
      return state;
  }
};

