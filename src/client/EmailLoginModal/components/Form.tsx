import * as React from 'react';
import { makeStyles } from '@material-ui/core';

type Props = {
  children: React.ReactNode;
  onSubmit: () => void;
};

const useStyles = makeStyles(() => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Form = ({ children, onSubmit }: Props) => {
  const classes = useStyles();
  return (
    <form
      className={classes.form}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {children}
    </form>
  );
};

export default Form;
