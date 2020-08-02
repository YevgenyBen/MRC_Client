import { combineReducers } from "redux";
import filterReducer from "./filterReducer";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
  filterReducer,
  modalReducer
});

export default rootReducer;
