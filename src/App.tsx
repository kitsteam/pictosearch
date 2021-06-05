import { Container } from '@material-ui/core';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import PictogramConfigurator from './components/PictogramConfigurator';
import PictogramSearch from './components/PictogramSearch';

type Props = {

}

const App: React.FC<Props> = () => {


  return (
    <Container fixed sx={{ backgroundColor: '#f8f9fa', padding: {xs: 1, sm: 3}, }}>
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <PictogramSearch />
          </Route>
          <Route exact strict path="/pictogram/:language([a-z]{2})/:id(\d+)" component={PictogramConfigurator} />
        </Switch>
      </HashRouter>
    </Container>
  )
}

export default App;