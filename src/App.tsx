import { Container } from '@mui/material';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppLayoutSwitch from './AppLayoutSwitch';

import TryItButton from "./components/Start/TryItButton";
import PictogramCollection from "./components/PictogramCollection";
import PictogramConfigurator from './components/PictogramConfigurator';
import PictogramSearch from './components/PictogramSearch';

const App: React.FC = () => {
  return (
    <Container fixed>
      {process.env.LAYOUT === 'element'
        ?
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
        :
        <div>
        <Switch>
          <Route exact path="/">
            <TryItButton />
          </Route>
          <Route exact path="/search">
            <AppLayoutSwitch />
          </Route>
          <Route exact path="/collection">
            <AppLayoutSwitch />
          </Route>
        </Switch>
        </div>
      }
    </Container>
  )
}

export default App;