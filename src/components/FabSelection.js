import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import "./FabSelection.css";
import Carousel from "react-bootstrap/Carousel";
import Paper from "@material-ui/core/Paper";
import {
  Link,
  Switch,
  Route,
  withRouter,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import { useHistory } from "react-router-dom";

function FabSelection() {
  const history = useHistory();
  const [index, setIndex] = useState(1);
  const [selected, setSelected] = useState(false);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="container">
      <div className={"buttonHolder"}>
        <img
          src="MRClogo.png"
          className="head"
          style={{
            height: "240px",
            padding: "40px",
          }}
        />

        <ButtonGroup
          fullWidth
          size="large"
          className="buttons"
          variant="contained">
          <Button
            onMouseOver={() => setIndex(0)}
            style={{
              backgroundColor: "rgb(10, 126, 141)",
              color: "white",
              fontSize: "1.5rem",
            }}
            onClick={() => {
              Cookies.set("fab", "Fab1", { expires: 365 });
              history.push("/Fab1");
            }}
            size="large">
            Fab 1
          </Button>

          <Button
            onMouseOver={() => setIndex(2)}
            style={{
              backgroundColor: "rgb(10, 126, 141)",
              color: "white",
              fontSize: "1.5rem",
            }}
            onClick={() => {
              Cookies.set("fab", "Fab2", { expires: 365 });
              history.push("/Fab2");
            }}
            size="large">
            Fab 2
          </Button>
        </ButtonGroup>
      </div>
      {/* <img src="./Fab2.jpg"></img> */}
      <Paper elevation={24} style={{ width: "775px", margin: "auto" }}>
        <Carousel
          fade={true}
          indicators={false}
          interval={0}
          controls={false}
          activeIndex={index}
          onSelect={handleSelect}
          style={{ marginTop: "30px" }}>
          <Carousel.Item>
            <img src="https://picsum.photos/775/600?random=1" />
          </Carousel.Item>
          <Carousel.Item>
            <img src="MH.jpg" />
          </Carousel.Item>
          <Carousel.Item>
            <img src="https://picsum.photos/775/600?random=2" />
          </Carousel.Item>
        </Carousel>
      </Paper>
    </div>
  );
}

export default FabSelection;
