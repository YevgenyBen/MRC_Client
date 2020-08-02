import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TableComponent from "./TableComponent";
import SplitButton from "./SplitButton";
import "./MainPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { useHistory } from "react-router-dom";

function MainPage({ fab }) {
  const history = useHistory();
  const [alignment, setAlignment] = useState(fab);
  console.log(alignment);

  const handleAlignment = (event, newAlignment) => {
    history.push(`/${newAlignment}`);
    setAlignment(newAlignment);
  };

  const [data, setData] = useState(null);

  const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 0,
    },
  }));

  const classes = useStyles();

  const filterObj = {
    CUST_NAME: useSelector((state) => state.filterReducer.custNameFilter),
    TECHNOLOGY: useSelector((state) => state.filterReducer.technologyFilter),
    FLOW: useSelector((state) => state.filterReducer.flowFilter),
    PRODUCT: useSelector((state) => state.filterReducer.productFilter),
    GDPW: useSelector((state) => state.filterReducer.gdpwFilter),
    AUTOMOTIVE: useSelector((state) => state.filterReducer.automotiveFilter),
    LIMIT: useSelector((state) => state.filterReducer.limitFilter),
  };

  useEffect(() => {
    try {
      fetch(process.env.REACT_APP_GET_MAIN_FILE + "/fab2")
        .then((response) => response.json())
        .then((tableInfo) => {
          try {
            console.log("first query to api: ", JSON.parse(tableInfo));
            setData(JSON.parse(tableInfo));
          } catch (err) {
            console.log(err);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }, [fab, alignment]);

  if (data) {
    var csvData = [];
    csvData = data.map((item) => {
      let obj = {
        CUST_NAME: item.CUST_NAME,
        TECHNOLOGY: item.TECHNOLOGY,
        Flow: item.Flow,
        Product: item.Product,
        GDPW: item.GDPW,
        AUTOMOTIVE: item.AUTOMOTIVE,
        Limit: item.Limit,
      };

      item.months.map((oneMonth, index) => {
        index += 1;
        obj["Month " + index] = oneMonth.MONTH;
        obj["Month " + index + " Count_wf"] = oneMonth.Count_wf;
        obj["Month " + index + " N_Maverick_lots"] = oneMonth.N_Maverick_lots;
        obj["Month " + index + " N_wf_RMA"] = oneMonth.N_wf_RMA;
        obj["Month " + index + " Stdev"] = oneMonth.Stdev;
        obj["Month " + index + " Yield"] = oneMonth.Yield;
      });
      return obj;
    });
  }

  return (
    <div className="App ">
      {/**
       * App BAR
       */}
      <AppBar color="primary" position="static">
        <Toolbar className={"header"} style={{ placeContent: "space-between" }}>
          <Typography edge="start" variant="h5" className={classes.title}>
            MRC Table {data && " - Last Updated: " + data[0].LastModified}
          </Typography>
          <ToggleButtonGroup
            style={{ backgroundColor: "white", border: "1px solid black" }}
            value={alignment}
            exclusive
            size="small"
            onChange={handleAlignment}
            aria-label="text alignment">
            {alignment == "Fab1" ? (
              <ToggleButton
                value="Fab1"
                style={{
                  color: "black",
                  boxShadow: "inset -1px 0px 5px #000000",
                }}
                disabled>
                Fab 1
              </ToggleButton>
            ) : (
              <ToggleButton value="Fab1" style={{ color: "black" }}>
                Fab 1
              </ToggleButton>
            )}
            {alignment == "Fab2" ? (
              <ToggleButton
                value="Fab2"
                style={{
                  color: "black",
                  boxShadow: "inset 1px 0px 5px #000000",
                }}
                disabled>
                Fab 2
              </ToggleButton>
            ) : (
              <ToggleButton value="Fab2" style={{ color: "black" }}>
                Fab 2
              </ToggleButton>
            )}
          </ToggleButtonGroup>
        </Toolbar>
      </AppBar>
      {/**
       * App BAR
       */}

      {/*main table and download button*/}
      <div>
        <div className="py-3">{data && <SplitButton csvData={csvData} />}</div>

        {data && <TableComponent yieldData={data} filterObj={filterObj} />}
      </div>

      {/*footer*/}
      {data && (
        <div
          style={{
            marginTop: "30px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}>
          For problems and issues please contact
          <a href="mailto:evyatar@towersemi.com" className="m-2">
            Evyatar Sela
          </a>
        </div>
      )}
    </div>
  );
}
export default MainPage;
