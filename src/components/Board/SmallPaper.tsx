import * as React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type SmallPaperProps = {
  children: React.ReactNode;
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: theme.spacing(4),
  },

  paper: {
    padding: theme.spacing(2),
  },
}));

const SmallPaper = ({ children }: SmallPaperProps) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        {children}
      </Paper>
    </div>
  );
};

export default SmallPaper;
