import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import TimelineRoundedIcon from "@material-ui/icons/TimelineRounded";
import IconButton from "@material-ui/core/IconButton";
import "./TableComponent.css";
import SelectComponent from "./SelectComponent";
import CostumModal from "./ModalComponent";
import InsertChartOutlinedIcon from "@material-ui/icons/InsertChartOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import { useDispatch } from "react-redux";
import { actions } from "../actions";

export default function TableComponent(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useDispatch();
  const monthDataNames = ["Count", "Yield", "Stdev", "RMA"];

  useEffect(() => {
    setPage(0);
  }, [props]);

  const fetchGraphData = (prod, Percentile) => {
    fetch(process.env.REACT_APP_GET_CHART_FILE + "?product=" + prod)
      .then((response) => response.json())
      .then((ChartInfo) => {
        dispatch(actions["CHART_INFO"](ChartInfo));
        dispatch(actions["PRODUCT_NAME"](prod));
        dispatch(actions["PERCENTILE"](Percentile));
        setModalShow(true);
      });
  };

  const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
      color: theme.palette.common.black,
    },
    tooltip: {
      backgroundColor: theme.palette.common.black,
      fontSize: "15px",
    },
  }));

  function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();

    return <Tooltip arrow classes={classes} {...props} />;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const dataForFiler = [...props.yieldData]; //here

  const CustNames = dataForFiler
    .map((item) => item.CUST_NAME)
    .filter((value, index, self) => self.indexOf(value) === index);

  const TECHNOLOGY = dataForFiler
    .map((item) => item.TECHNOLOGY)
    .filter((value, index, self) => self.indexOf(value) === index);

  const Flow = dataForFiler
    .map((item) => item.Flow)
    .filter((value, index, self) => self.indexOf(value) === index);

  const Product = dataForFiler
    .map((item) => item.Product)
    .filter((value, index, self) => self.indexOf(value) === index);

  const GDPW = dataForFiler
    .map((item) => item.GDPW)
    .filter((value, index, self) => self.indexOf(value) === index);

  const AUTOMOTIVE = dataForFiler
    .map((item) => item.AUTOMOTIVE)
    .filter((value, index, self) => self.indexOf(value) === index);

  //   const Limit = dataForFiler
  //     .map((item) => item.Limit)
  //     .filter((value, index, self) => self.indexOf(value) === index);

  /*filters*/
  //experimental filter
  const allFiltered = props.yieldData.filter((item) => {
    return (
      (!props.filterObj.CUST_NAME ||
        item.CUST_NAME === props.filterObj.CUST_NAME) &&
      (!props.filterObj.TECHNOLOGY ||
        item.TECHNOLOGY === props.filterObj.TECHNOLOGY) &&
      (!props.filterObj.FLOW || item.Flow === props.filterObj.FLOW) &&
      (!props.filterObj.PRODUCT || item.Product === props.filterObj.PRODUCT) &&
      (!props.filterObj.GDPW || item.GDPW === props.filterObj.GDPW) &&
      (!props.filterObj.AUTOMOTIVE ||
        item.AUTOMOTIVE === props.filterObj.AUTOMOTIVE) &&
      (!props.filterObj.LIMIT || item.Limit === props.filterObj.LIMIT)
    );
  });

  /**
   * INSERT NEW FILTERS HERE
   */

  //   console.log("pre filter: ", allFiltered);
  function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    let comparison = 0;
    if (a.Product.includes("new")) {
      comparison = -1;
    } else {
      comparison = 1;
    }
    return comparison;
  }
  allFiltered.sort(compare);

  //   console.log("post filter: ", allFiltered);

  return (
    <TableContainer className="container-fluid" component={Paper}>
      <CostumModal show={modalShow} onHide={() => setModalShow(false)} />
      <Table aria-label="spanning table">
        <TableHead>
          <TableRow className="top-table-header">
            <TableCell align="center" colSpan={7}>
              General
            </TableCell>
            <TableCell align="center" colSpan={4}>
              {allFiltered.length > 0 &&
                [
                  allFiltered[0].months[0].MONTH.slice(0, 4),
                  "/",
                  allFiltered[0].months[0].MONTH.slice(4),
                ].join("")}
            </TableCell>
            <TableCell align="center" colSpan={4}>
              {allFiltered.length > 0 &&
                [
                  allFiltered[0].months[1].MONTH.slice(0, 4),
                  "/",
                  allFiltered[0].months[1].MONTH.slice(4),
                ].join("")}
            </TableCell>
            <TableCell align="center" colSpan={4}>
              {allFiltered.length > 0 &&
                [
                  allFiltered[0].months[2].MONTH.slice(0, 4),
                  "/",
                  allFiltered[0].months[2].MONTH.slice(4),
                ].join("")}
            </TableCell>
            <TableCell align="center" colSpan={4}>
              {allFiltered.length > 0 &&
                [
                  allFiltered[0].months[3].MONTH.slice(0, 4),
                  "/",
                  allFiltered[0].months[3].MONTH.slice(4),
                ].join("")}
            </TableCell>
          </TableRow>
          <TableRow className="second-table-header">
            <TableCell align="center">
              <InsertChartOutlinedIcon fontSize="large" />
            </TableCell>
            <TableCell align="center">
              {CustNames && (
                <SelectComponent
                  name="CUST_NAME"
                  propsToFilter={CustNames}
                  nameField="Customer"
                />
              )}
            </TableCell>
            <TableCell align="center">
              {TECHNOLOGY && (
                <SelectComponent
                  name="TECHNOLOGY"
                  propsToFilter={TECHNOLOGY}
                  nameField="Technology"
                />
              )}
            </TableCell>
            <TableCell align="center">
              {Flow && (
                <SelectComponent
                  name="FLOW"
                  propsToFilter={Flow}
                  nameField="Flow"
                />
              )}
            </TableCell>
            <TableCell align="center">
              {Product && (
                <SelectComponent
                  name="PRODUCT"
                  propsToFilter={Product}
                  nameField="Product"
                />
              )}
            </TableCell>
            <TableCell align="center">
              {GDPW && (
                <SelectComponent
                  name="GDPW"
                  propsToFilter={GDPW}
                  nameField="GDPW"
                />
              )}
            </TableCell>
            <TableCell align="center">
              {AUTOMOTIVE && (
                <SelectComponent
                  name="AUTOMOTIVE"
                  propsToFilter={AUTOMOTIVE}
                  nameField="Automotive"
                />
              )}
            </TableCell>
            {/* <TableCell align="center">
              {Limit && (
                <SelectComponent
                  name="LIMIT"
                  propsToFilter={Limit}
                  nameField="Limit"
                />
              )}
            </TableCell> */}

            {monthDataNames.map((item, index) => {
              return (
                <TableCell align="center" key={index}>
                  {item}
                </TableCell>
              );
            })}
            {monthDataNames.map((item, index) => {
              return (
                <TableCell align="center" key={index}>
                  {item}
                </TableCell>
              );
            })}
            {monthDataNames.map((item, index) => {
              return (
                <TableCell align="center" key={index}>
                  {item}
                </TableCell>
              );
            })}
            {monthDataNames.map((item, index) => {
              return (
                <TableCell align="center" key={index}>
                  {item}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {allFiltered &&
            allFiltered
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow role="checkbox" tabIndex={-1} key={index}>
                  <TableCell>
                    <div
                      style={{ textAlign: "center" }}
                      prod={row.Product}
                      onClick={() =>
                        fetchGraphData(row.Product, row.Percentile)
                      }>
                      <IconButton>
                        <TimelineRoundedIcon
                          fontSize="default"
                          color="action"
                        />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell align="center">{row.CUST_NAME}</TableCell>
                  <TableCell align="center">{row.TECHNOLOGY}</TableCell>
                  <TableCell align="center">{row.Flow}</TableCell>
                  <BootstrapTooltip
                    title={"Limit: " + row.Limit}
                    arrow={true}
                    placement={"top"}>
                    <TableCell align="center">
                      {row.Product.includes("new") ? (
                        <>
                          <span>{row.Product.split(" ")[0]}</span>{" "}
                          <span
                            style={{
                              fontWeight: "bold",
                              fontStyle: "italic",
                              color: "green",
                            }}>
                            {row.Product.split(" ")[1]}
                          </span>
                        </>
                      ) : (
                        row.Product
                      )}
                    </TableCell>
                  </BootstrapTooltip>
                  <TableCell align="center">{row.GDPW}</TableCell>
                  <TableCell align="center">{row.AUTOMOTIVE}</TableCell>
                  {/* <TableCell align="center">{row.Limit}</TableCell> */}
                  {row.months.map((mRow, innerIndex) => (
                    <React.Fragment key={innerIndex}>
                      <TableCell
                        align="center"
                        className={"month" + innerIndex}>
                        {mRow.Count_wf}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={"month" + innerIndex}>
                        {mRow.Yield &&
                          (Math.round(mRow.Yield * 100) / 100).toFixed(2)}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={"month" + innerIndex}>
                        {mRow.Yield &&
                          (Math.round(mRow.Stdev * 100) / 100).toFixed(2)}
                      </TableCell>

                      {/* button for rma */}
                      {/* <TableCell
                        align="center"
                        className={"month" + innerIndex}>
                        {mRow.N_wf_RMA > 4 ? (
                          <Button
                            style={{
                              backgroundColor: "#00695c",
                              color: "white"
                            }}
                            size="small"
                            variant="contained"
                            // color="black"
                          >
                            {mRow.N_wf_RMA}
                          </Button>
                        ) : (
                          mRow.N_wf_RMA
                        )} */}

                      <TableCell
                        align="center"
                        className={"month" + innerIndex}>
                        {mRow.N_wf_RMA}
                      </TableCell>
                    </React.Fragment>
                  ))}
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={allFiltered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </>
    </TableContainer>
  );
}
