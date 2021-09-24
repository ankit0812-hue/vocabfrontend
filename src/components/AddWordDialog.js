import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import CircularProgress from "@mui/material/CircularProgress";

import "./AddWordDialog.css";

const AddWordDialog = (props) => {
  const [enteredWord, setEnteredWord] = useState("");
  const [formError, setFormError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // function handling closing of the dialog
  const handleClose = () => {
    props.handleClose();
    setEnteredWord("");
  };
  const handleFormSubmit = () => {
    if (enteredWord.length === 0) {
      setFormError(true);
      setErrorMsg("Please enter something to add !");
      return;
    }
    setFormError(false);
    setErrorMsg("");
    props.handleSubmit(enteredWord);
  };
  const useStyles = makeStyles((theme) => ({
    action: {
      color: "#4e0d3a !important",
    },
    input: {
      color: "#4e0d3a !important",
    },
    loader: {
      color: "#4e0d3a !important",
    },
    error: {
      color: "red",
    },
  }));
  const classes = useStyles();
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      fullWidth={true}
      maxWidth="xs"
      className="myInput"
    >
      <DialogTitle>Add New Word</DialogTitle>
      <DialogContent className="myInput">
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="New Word"
          type="text"
          fullWidth
          variant="standard"
          className={classes.input}
          onChange={(e) => setEnteredWord(e.target.value)}
        />
        {formError && (
          <Typography
            variant="body2"
            component="p"
            className={classes.error}
            style={{
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            {errorMsg}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} className={classes.action}>
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} className={classes.action}>
          Add
        </Button>
        {props.isSubmitting ? (
          <CircularProgress size={24} className={classes.loader} />
        ) : null}
      </DialogActions>
    </Dialog>
  );
};

export default AddWordDialog;
