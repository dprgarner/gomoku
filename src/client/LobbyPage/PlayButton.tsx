import * as React from 'react';
import Button from '@material-ui/core/Button';

type Props = {
  displayName?: string;
};

const PlayButton = ({ displayName }: Props) => (
  <Button size="medium" color="primary" variant="contained">
    Play {displayName || 'Stranger'}
  </Button>
);

export default PlayButton;
