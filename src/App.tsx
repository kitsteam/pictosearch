import { Container } from '@mui/material';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppLayoutSwitch from './AppLayoutSwitch';

import Start from "./components/Start/Start";
import PictogramCollection from "./components/PictogramCollection";
import PictogramConfigurator from './components/PictogramConfigurator';
import PictogramSearch from './components/PictogramSearch';

const App: React.FC = () => {
  return (
    <>
      {process.env.LAYOUT === 'element'
        ?
        <Container fixed>
          <Switch>
            <Route exact path="/">
              <Redirect to="/search" />
            </Route>
            <Route exact path="/search">
              <PictogramSearch />
            </Route>
            <Route exact path="/collection">
              <PictogramCollection />
            </Route>
            <Route exact strict path="/pictogram/:language([a-z]{2})/:id(\d+)/:version([\-a-z0-9]+)?" component={PictogramConfigurator} />
          </Switch>
        </Container>
        :
        <>
          <Switch>
            <Route exact path="/">
             <Start />
            </Route>
            <Route exact path="/search">
              <AppLayoutSwitch />
            </Route>
            <Route exact path="/collection">
              <AppLayoutSwitch />
            </Route>
          </Switch>
        </>
      }
    </>
  )
}

export default App;