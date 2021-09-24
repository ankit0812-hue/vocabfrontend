import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllItems,
  searchWord,
  addNewWord,
} from "../container/actions/WordAction";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import NavBar from "./NavBar";
import WordList from "./WordList";
import { makeStyles } from "@mui/styles";
import { ClassNames } from "@emotion/react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AddWordDialog from "../components/AddWordDialog";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [wordList, setWordList] = useState([]);
  const [listLoader, setListLoader] = useState(false);
  const [searchErrorMessage, setSearchErrorMessage] = useState("");
  const [addWordDialog, setAddWordDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successfull, setSuccessfull] = useState(false);
  const [errorMssg, setErrorMssg] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  //function for searching a particular word
  const search = (event) => {
    const searchItem = event.target.value;
    setSearchValue(searchItem);
    setListLoader(true);
    dispatch(searchWord(searchItem))
      .then(() => {
        setListLoader(false);
        setSearchErrorMessage("");
      })
      .catch((error) => {
        setListLoader(false);
        setSearchErrorMessage(error.message);
      });
  };
  // function for closing the add word dialog
  const formClose = () => {
    setAddWordDialog(false);
  };
  // function for handling form submit of adding a new word
  const formSubmit = (value) => {
    setIsSubmitting(true);
    dispatch(addNewWord(value))
      .then(() => {
        setIsSubmitting(false);
        setAddWordDialog(false);
        setSuccessfull(true);
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError(true);
        setErrorMssg(error.message);
      });
  };
  // function to handle closing of alerts
  const handleClose = () => {
    setSuccessfull(false);
    setError(false);
  };
  useEffect(() => {
    setListLoader(true);
    dispatch(getAllItems())
      .then((data) => {
        setListLoader(false);
      })
      .catch((error) => {
        setListLoader(false);
      });
  }, []);
  // fetching the state of the application
  const wordsState = useSelector((state) => state.words);
  useEffect(() => {
    setWordList(wordsState.wordList);
  }, [wordsState.wordList]);

  const useStyles = makeStyles((theme) => ({
    loading: {
      marginTop: "5em",
      color: "#4e0d3a !important",
    },
    loadContainer: {
      display: "flex",
      width: "95%",
      height: 80,
      alignItems: "center",
      justifyContent: "center",
    },
    root: {
      position: "relative",
      minWidth: "100%",
    },
    floatingBtn: {
      position: "fixed !important",
      right: 20,
      bottom: 20,
      color: "white !important",
      backgroundColor: "#4e0d3a !important",
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavBar onChange={search} value={searchValue} />
      {listLoader ? (
        <Box className={classes.loadContainer}>
          <CircularProgress className={classes.loading} />
        </Box>
      ) : (
        <WordList words={wordList} error={searchErrorMessage} />
      )}
      <Fab
        className={classes.floatingBtn}
        onClick={() => {
          setAddWordDialog(true);
        }}
      >
        <AddIcon />
      </Fab>
      {addWordDialog ? (
        <AddWordDialog
          open={addWordDialog}
          isSubmitting={isSubmitting}
          handleClose={formClose}
          handleSubmit={formSubmit}
        />
      ) : null}
      {successfull ? (
        <Snackbar
          open={successfull}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert
            severity="success"
            sx={{ width: "100%" }}
            onClose={handleClose}
          >
            Word Added successfully!
          </Alert>
        </Snackbar>
      ) : null}
      {error ? (
        <Snackbar open={error} autoHideDuration={4000} onClose={handleClose}>
          <Alert severity="error" sx={{ width: "100%" }} onClose={handleClose}>
            {errorMssg}
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
};
export default Home;
