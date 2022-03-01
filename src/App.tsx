import { Container } from '@mui/material';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import PictogramCollection from "./components/PictogramCollection";
import PictogramConfigurator from './components/PictogramConfigurator';
import PictogramSearch from './components/PictogramSearch';

type Props = {

}

const App: React.FC<Props> = () => {


  return (
    <Container fixed>
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <PictogramSearch />
          </Route>
          <Route exact path="/collection">
            <PictogramCollection />
          </Route>
          <Route exact strict path="/pictogram/:language([a-z]{2})/:id(\d+)/:version([\-a-z0-9]+)?" component={PictogramConfigurator} />
        </Switch>
      </HashRouter>
    </Container>
  )
}

export default App;