import * as React from 'react';
import {
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';

import FadeIn from '../FadeIn';

type EmailModalProps = {
  onLoginComplete: () => void;
};

const useStyles = makeStyles((theme) => ({
  emailBody: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },

  paper: {
    padding: 30,
    pointerEvents: 'auto',
    width: 400,
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
  },

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

const EmailModalBody = ({ onLoginComplete }: EmailModalProps) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const classes = useStyles();

  const emailInputRef = useFocusRef();

  return (
    <div className={classes.emailBody}>
      <FadeIn>
        <Paper elevation={3} className={classes.paper}>
          <form className={classes.form}>
            <Typography component="h3" variant="h6">
              Choose an email address and password
            </Typography>

            <TextField
              inputRef={emailInputRef}
              autoComplete="email"
              className={classes.textField}
              label="Email"
              type="text"
              variant="filled"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />

            <TextField
              className={classes.textField}
              label="Password"
              type="password"
              value={password}
              variant="filled"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />

            <Button color="primary" variant="contained">
              Log in
            </Button>
          </form>
        </Paper>
      </FadeIn>
    </div>
  );
};

export default EmailModalBody;
