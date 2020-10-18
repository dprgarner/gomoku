import * as React from 'react';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
  Switch,
  Typography,
} from '@material-ui/core';
import useCreateMatch from './useCreateMatch';

import PaperModal from '../components/PaperModal';
import StoneRadio from './StoneRadio';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onError: (error: Error) => void;
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },

  buttonContainer: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
}));

const CreateMatchModal = ({ isOpen, onClose, onError }: Props) => {
  const classes = useStyles();
  const [player, setPlayer] = React.useState<'0' | '1'>('0');
  const [boardSize, setBoardSize] = React.useState<15 | 19>(15);
  const [unlisted, setUnlisted] = React.useState(false);

  const createMatch = useCreateMatch();
  const handleCreateMatch = () =>
    createMatch({ player, boardSize, unlisted }, (error?: Error) => {
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

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Board size:</FormLabel>
        <RadioGroup
          name="board size"
          value={`${boardSize}`}
          onChange={(_event, boardSize) =>
            setBoardSize(parseInt(boardSize, 10) as 15 | 19)
          }
        >
          <FormControlLabel
            value="15"
            control={<Radio color="primary" />}
            label="15x15"
          />
          <FormControlLabel
            value="19"
            control={<Radio color="primary" />}
            label="19x19"
          />
        </RadioGroup>
      </FormControl>

      <div>
        <FormControlLabel
          control={
            <Switch
              checked={unlisted}
              onChange={() => setUnlisted(!unlisted)}
              name="Unlisted"
              color="primary"
            />
          }
          label="Unlisted"
        />
      </div>

      <div className={classes.buttonContainer}>
        <Button variant="contained" color="primary" onClick={handleCreateMatch}>
          Create Game
        </Button>
      </div>
    </PaperModal>
  );
};

export default CreateMatchModal;
