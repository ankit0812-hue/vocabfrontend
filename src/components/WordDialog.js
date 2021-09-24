import React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { makeStyles } from "@mui/styles";
// defining transition for opening and closing of the dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const WordDialog = (props) => {
  const useStyles = makeStyles((theme) => ({
    title: {
      textTransform: "capitalize",
    },
    header: {
      backgroundColor: "#4e0d3a !important",
    },
    infoContainer: {
      margin: 20,
    },
  }));
  const classes = useStyles();
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }} className={classes.header}>
        <Toolbar>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="close"
            onClick={props.handleClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            sx={{ ml: 2, flex: 1 }}
            variant="h6"
            component="div"
            className={classes.title}
          >
            {props.selectedWord.word}
          </Typography>
        </Toolbar>
      </AppBar>
      {props.selectedWord.description.map((item, index) => (
        <div className={classes.infoContainer} key={index.toString()}>
          <Typography className={classes.pos} color="textSecondary">
            {item.lexicalCategory.id}
          </Typography>
          {item.entries[0].etymologies && (
            <Typography className={classes.pos} color="textSecondary">
              Origin: {item.entries[0].etymologies[0]}
            </Typography>
          )}

          {item.entries[0].senses.map((sense, index) => (
            <Typography
              key={index.toString()}
              style={{
                marginTop: 15,
              }}
            >
              {sense.definitions[0]}
              {sense.examples && (
                <ul
                  style={{
                    marginTop: 0,
                    paddingTop: 0,
                  }}
                >
                  {sense.examples.map((ex, _in) => (
                    <li key={_in.toString()}>{ex.text}</li>
                  ))}
                </ul>
              )}
              {sense.subsenses &&
                sense.subsenses.map((subsense, _si) => (
                  <Typography key={_si.toString()}>
                    {subsense.definitions[0]}
                    {subsense.examples && (
                      <ul
                        style={{
                          marginTop: 0,
                          paddingTop: 0,
                        }}
                      >
                        {subsense.examples.map((ex, _in) => (
                          <li key={_in.toString()}>{ex.text}</li>
                        ))}
                      </ul>
                    )}
                  </Typography>
                ))}
            </Typography>
          ))}
        </div>
      ))}
    </Dialog>
  );
};

export default WordDialog;
