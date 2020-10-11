import * as React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

import CookiesModal from './CookiesModal';

const useStyles = makeStyles((theme) => ({
  cookies: {
    marginTop: theme.spacing(2),
  },
}));

const CookiesModalLauncher = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const classes = useStyles();

  return (
    <>
      <div className={classes.cookies}>
        <Typography variant="body2" component="p">
          {'🍪🍪🍪'}
        </Typography>
        <Typography variant="body2" component="p">
          {'This app stores personal data. Read more '}
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              setOpenModal(true);
            }}
          >
            here.
          </a>
        </Typography>
        <Typography variant="body2" component="p">
          {'🍪🍪🍪'}
        </Typography>
      </div>
      <CookiesModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default CookiesModalLauncher;
