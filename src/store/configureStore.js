import { createStore, combineReducers, applyMiddleware , compose } from "redux";

import authReducer  from '../reducer/auth';
import postReducer from '../reducer/post';
import requestReducer from '../reducer/request'
import playerReducer from '../reducer/player';
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      post: postReducer,
      requset: requestReducer,
      player: playerReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  
  return store;
};
