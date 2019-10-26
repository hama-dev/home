export default (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        uid: action.uid,
        adminProperty: action.adminProperty
      };
    case "LOGOUT":
      return {};

    default:
      return state;
  }
};
