import * as React from 'react';
import { Typography } from '@material-ui/core';

type Props = {
  children: React.ReactNode;
};

const Title: React.FC<Props> = ({ children }) => (
  <Typography component="h3" variant="h6">
    {children}
  </Typography>
);

export default Title;
