import * as React from 'react';
import { makeStyles, TextField } from '@material-ui/core';

type Props = {
  autoComplete: string;
  label: string;
  onChange: (text: string) => void;
  type: 'text' | 'password';
  value: string;
  error?: string;
  focusOnMount?: boolean;
};

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const useFocusRef = () => {
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.focus();
      }
    }, 50);
  }, []);

  return ref;
};

export const Field = ({
  autoComplete,
  error,
  focusOnMount,
  label,
  onChange,
  type,
  value,
}: Props) => {
  const classes = useStyles();
  const ref = useFocusRef();

  return (
    <TextField
      autoComplete={autoComplete}
      className={classes.textField}
      error={!!error}
      helperText={error}
      inputRef={focusOnMount ? ref : undefined}
      label={label}
      onChange={(e) => onChange(e.currentTarget.value)}
      type={type}
      value={value}
      variant="filled"
    />
  );
};
export default Field;
