import React, { useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { makeStyles } from "@mui/styles";
const WordCard = (props) => {
  const useStyles = makeStyles((theme) => ({
    card: {
      width: "90%",
      marginLeft: "5em",
      marginTop: "2em",
      cursor: "pointer",
      "@media(max-width: 768px)": {
        marginLeft: "1em",
      },
    },
    title: {
      textTransform: "capitalize",
    },
  }));
  React.useEffect(() => {
    console.log(props);
  }, []);
  const classes = useStyles();
  return (
    <Card
      className="aa"
      variant="outlined"
      className={classes.card}
      onClick={() => {
        props.onClick();
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.title}>
          {props.title}
        </Typography>
        {props?.detail.map((item, i) => (
          <Typography variant="body2" component="p" key={i.toString()}>
            [{item.lexicalCategory.id}]{" "}
            {item.entries[0].senses[0].definitions[0]}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default WordCard;
