import * as React from 'react';
import { Fade } from '@material-ui/core';

type FadeInProps = {
  children: React.ReactElement;
};

const FadeIn = ({ children }: FadeInProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setIsOpen(true);

    return () => setIsOpen(false);
  }, []);

  return (
    <Fade in={isOpen} timeout={500}>
      {children}
    </Fade>
  );
};

export default FadeIn;
