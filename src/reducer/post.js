const postReducer = (state = {}, action) => {

  switch (action.type) {
    case "SET_POST":
      return action.post;

    case "DELETE_POST":
      return state.filter(index => {
        return index.id !== action.post.id;
      });

    default:
      return state;
  }
};

export default postReducer;
