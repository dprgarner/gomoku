import * as React from 'react';
import { FormControlLabel, Switch, FormControl } from '@material-ui/core';

import SmallPaper from './SmallPaper';

type SettingsPaperProps = {
  children: React.ReactNode;
  showNumbers: boolean;
  setShowNumbers: React.Dispatch<React.SetStateAction<boolean>>;
};

const SettingsPaper = ({
  children,
  showNumbers,
  setShowNumbers,
}: SettingsPaperProps) => {
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
      {children}
    </SmallPaper>
  );
};

export default SettingsPaper;
