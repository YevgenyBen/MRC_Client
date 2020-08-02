import React, { useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import GetAppOutlinedIcon from "@material-ui/icons/GetAppOutlined";
import { CSVLink } from "react-csv";

function SplitButton({ csvData }) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      style={{ fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"] }}>
      <Grid item xs={12}>
        <ButtonGroup
          variant="contained"
          color="default"
          ref={anchorRef}
          aria-label="split button">
          <Button
            startIcon={<GetAppOutlinedIcon />}
            onClick={handleToggle}
            variant="outlined">
            {"Download"}
          </Button>
        </ButtonGroup>
        <Popper
          style={{ zIndex: 10 }}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    <MenuItem>
                      <CSVLink
                        style={{
                          textDecoration: "none",
                          textAlign: "center",
                          color: "black",
                        }}
                        filename={"MRC_Parsed.csv"}
                        data={csvData}>
                        Download this table
                      </CSVLink>
                    </MenuItem>
                    <MenuItem>
                      <a
                        style={{
                          textDecoration: "none",
                          textAlign: "center",
                          color: "black",
                        }}
                        href="http://mhvmwebprod3/MRC_WEB_API/CSV imports/Raw_data_by_wafer.csv"
                        download="proposed_file_name">
                        Download raw data by wafer
                      </a>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
}

export default SplitButton;
