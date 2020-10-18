import * as React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
} from '@material-ui/core';

import Stone from '../components/Stone';

type Props = {
  player: '0' | '1';
  setPlayer: (player: '0' | '1') => void;
};

type StyleProps = Pick<Props, 'player'>;

const stone = {
  display: 'inline-block',
  flex: '0 0 40px',
};

const useStyles = makeStyles((theme) => ({
  stoneContainer: {
    display: 'flex',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: 300,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  blackStone: ({ player }: StyleProps) => ({
    ...stone,
    opacity: player === '0' ? 1 : 0.5,
  }),

  whiteStone: ({ player }: StyleProps) => ({
    ...stone,
    opacity: player === '1' ? 1 : 0.33,
  }),

  formControl: {
    width: '100%',
  },
  radioGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const StoneRadio = ({ player, setPlayer }: Props) => {
  const classes = useStyles({ player });

  return (
    <>
      <div className={classes.stoneContainer}>
        <div className={classes.blackStone}>
          <Stone player="0" />
        </div>

        <div className={classes.whiteStone}>
          <Stone player="1" />
        </div>
      </div>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Play as:</FormLabel>
        <RadioGroup
          row
          className={classes.radioGroup}
          name="player"
          value={player}
          onChange={(_event, player) => setPlayer(player as '0' | '1')}
        >
          <FormControlLabel
            value="0"
            control={<Radio color="primary" />}
            label="Black"
          />
          <FormControlLabel
            value="1"
            control={<Radio color="primary" />}
            label="White"
            labelPlacement="start"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default StoneRadio;
