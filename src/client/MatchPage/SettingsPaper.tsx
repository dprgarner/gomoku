import * as React from 'react';
import { FormControlLabel, Switch, FormControl } from '@material-ui/core';

import SmallPaper from './SmallPaper';

type SettingsPaperProps = {
  showNumbers: boolean;
  setShowNumbers: React.Dispatch<React.SetStateAction<boolean>>;
};

const SettingsPaper = ({ showNumbers, setShowNumbers }: SettingsPaperProps) => {
  return (
    <SmallPaper>
      <FormControl component="fieldset">
        <FormControlLabel
          control={
            <Switch
              checked={showNumbers}
              onChange={() => setShowNumbers((s) => !s)}
              name="showNumbers"
              color="primary"
            />
          }
          label="Show Turn Numbers"
        />
      </FormControl>
    </SmallPaper>
  );
};

export default SettingsPaper;
