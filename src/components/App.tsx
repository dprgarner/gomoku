import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route, Switch, useParams } from 'react-router-dom';

import Layout from './Layout';
import ThemeProvider from './ThemeProvider';
import LoadingBackdrop from './loading/LoadingBackdrop';
import GomokuClientContainer from './GomokuClientContainer';

const Lobby = () => null;

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CssBaseline />
        <LoadingBackdrop>
          <Layout>
            <Switch>
              <Route path="/match/:matchID/player/:playerID">
                <GomokuClientContainer />
              </Route>
              <Route>
                <Lobby />
              </Route>
            </Switch>
          </Layout>
        </LoadingBackdrop>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
