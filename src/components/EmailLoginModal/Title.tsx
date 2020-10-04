import * as React from 'react';
import { Typography } from '@material-ui/core';

const Title: React.FC = ({ children }) => (
  <Typography component="h3" variant="h6">
    {children}
  </Typography>
);

export default Title;
