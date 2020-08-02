import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import TableComponent from "./components/TableComponent";
import SplitButton from "./components/SplitButton";
import FabSelection from "./components/FabSelection";
import MainPage from "./components/MainPage";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { useHistory } from "react-router-dom";

function App() {
  const history = useHistory();
  return (
    <>
      {Cookies.get("fab") ? (
        Cookies.get("fab") == "Fab1" ? (
          history.push("/Fab1")
        ) : (
          history.push("/Fab2")
        )
      ) : (
        // <MainPage fab={Cookies.get("fab")} />
        <FabSelection />
      )}
    </>
  );
}

export default App;
