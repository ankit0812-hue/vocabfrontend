import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
// defines the navbar component
const NavBar = (props) => {
  // defines the styles for the component
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    text: {
      flexGrow: 1,
      display: "block",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    appBar: {
      backgroundColor: "#4e0d3a !important",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "50%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputElement: {
      color: "white !important",
      "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          width: "12ch",
          "&:focus": {
            width: "20ch",
          },
        },
      },
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h5" className={classes.text}>
            Vocabulary App
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search.."
              onChange={props.onChange}
              value={props.value}
              className={classes.inputElement}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
