import React, { useState } from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import WordCard from "./WordCard";
import { makeStyles } from "@mui/styles";
import WordDialog from "./WordDialog";
const WordList = (props) => {
  const [selectedWord, setSelectedWord] = useState({});
  const [wordDialog, setWordDialog] = useState(false);
  const data = props.words;
  const error = props.error;
  const useStyles = makeStyles((theme) => ({
    wordContainer: {
      marginBottom: "20px",
    },
    error: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "red",
    },
  }));
  //function for closing the word display dialog
  const displayClose = () => {
    setWordDialog(false);
    setSelectedWord("");
  };
  const classes = useStyles();
  return (
    <>
      {!error ? (
        <Grid container className={classes.wordContainer}>
          {data.map((item, i) => (
            <Grid xs={12} item key={item._id}>
              <WordCard
                title={item.word}
                detail={item.description}
                onClick={() => {
                  console.log("Here");
                  setSelectedWord(item);
                  setWordDialog(true);
                }}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className={classes.error}>{error}</div>
      )}
      {wordDialog ? (
        <WordDialog
          selectedWord={selectedWord}
          open={wordDialog}
          handleClose={displayClose}
        />
      ) : null}
    </>
  );
};

export default WordList;
