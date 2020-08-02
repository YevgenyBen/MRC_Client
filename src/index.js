import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import rootReducer from "./reducers";
import { Provider } from "react-redux";
import {
  Switch,
  Route,
  withRouter,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import MainPage from "./components/MainPage";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/Fab1" component={() => <MainPage fab={"Fab1"} />} />
        <Route exact path="/Fab2" component={() => <MainPage fab={"Fab2"} />} />
        <Route exact path="/" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
