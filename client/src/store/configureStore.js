import { createStore } from 'redux'
import {applyMiddleware, compose} from "redux/index";
import rootReducer from "../reducers/rootReducer";
import thunk from "redux-thunk/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
