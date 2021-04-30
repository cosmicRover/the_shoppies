import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const MoviesBar = ({ values, handleNominate }) => {
  const classes = useStyles();

  if (values.length > 0) {
    const renderList = values.map((item, index) => {
      return (
        <div class="centerButtonText" key={index}>
          <p>
            {item.name} ({item.year})
          </p>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.margin}
            onClick={() => handleNominate(index)}
            disabled={item.isNominated}
          >
            Nominate
          </Button>
        </div>
      );
    });

    return renderList;
  } else {
    return <>Nothing yet</>;
  }
};

export default MoviesBar;
