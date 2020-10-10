import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  makeStyles,
} from '@material-ui/core';

type Props = {
  links: Array<{
    to: string;
    text: string;
  }>;
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const Breadcrumbs = ({ links }: Props) => {
  const classes = useStyles();
  const firstLinks = [...links];
  const lastLink = firstLinks.pop();

  return (
    <div className={classes.container}>
      <MuiBreadcrumbs>
        {firstLinks.map(({ to, text }) => (
          <Link key={to} color="inherit" component={RouterLink} to={to}>
            {text}
          </Link>
        ))}

        {lastLink && (
          <Link color="textPrimary" component={RouterLink} to={lastLink.to}>
            {lastLink.text}
          </Link>
        )}
      </MuiBreadcrumbs>
    </div>
  );
};

export default Breadcrumbs;
