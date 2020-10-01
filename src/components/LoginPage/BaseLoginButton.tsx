import * as React from 'react';
import { Button, makeStyles } from '@material-ui/core';

type BaseLoginButtonProps = {
  color: 'primary' | 'secondary' | 'white';
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
};

type StyleProps = Pick<BaseLoginButtonProps, 'color'>;

const useStyles = makeStyles((theme) => ({
  button: ({ color }: StyleProps) => ({
    margin: theme.spacing(2),

    ...(color === 'white' && {
      backgroundColor: '#ffffff',

      '&:hover': {
        backgroundColor: '#f8f8f8',
      },
    }),
  }),

  buttonText: {
    marginLeft: theme.spacing(2),
    width: '100%',
  },
}));

const BaseLoginButton = ({
  color,
  icon,
  text,
  onClick,
}: BaseLoginButtonProps) => {
  const classes = useStyles({ color });
  const buttonColor = color === 'white' ? 'inherit' : color;

  return (
    <Button
      className={classes.button}
      color={buttonColor}
      startIcon={icon}
      size="large"
      onClick={() => {
        setTimeout(() => {
          onClick();
        }, 350);
      }}
      variant="contained"
    >
      <span className={classes.buttonText}>{text}</span>
    </Button>
  );
};

export default BaseLoginButton;
