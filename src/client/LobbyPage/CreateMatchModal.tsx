import * as React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import useCreateMatch from './useCreateMatch';

import PaperModal from '../components/PaperModal';
import StoneRadio from './StoneRadio';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onError: (error: Error) => void;
};

type StyleProps = {
  player: '0' | '1';
};

const stone = {
  display: 'inline-block',
  flex: '0 0 40px',
};

const useStyles = makeStyles((theme) => ({
  //
}));

const CreateMatchModal = ({ isOpen, onClose, onError }: Props) => {
  const [player, setPlayer] = React.useState<'0' | '1'>('0');
  const classes = useStyles({ player });

  const createMatch = useCreateMatch((error?: Error) => {
    if (error) {
      onError(error);
    }
  });

  return (
    <PaperModal isOpen={isOpen} onClose={onClose}>
      <Typography component="h2" variant="h5" style={{ textAlign: 'center' }}>
        Create a new game
      </Typography>

      <StoneRadio player={player} setPlayer={setPlayer} />
    </PaperModal>
  );
};

export default CreateMatchModal;
