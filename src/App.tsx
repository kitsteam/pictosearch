import { Container, Grid } from '@mui/material';
import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import TryItButton from "./components/Layout/TryItButton";
import PictogramCollection from "./components/PictogramCollection";
import PictogramConfigurator from './components/PictogramConfigurator';
import PictogramSearch from './components/PictogramSearch';

type Props = {

}

const App: React.FC<Props> = () => {
  const location = useLocation();

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
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent={location.pathname === '/' ? 'center' : 'flex-start'}
          py="3vh"
          style={{ minHeight: '100vh' }}
        >
          <Grid item sx={{ width: location.pathname === '/' ? 'auto' : { xs: 'auto', sm: '100%' } }}>
            <Header size={location.pathname === '/' ? 'normal' : 'small'} />
          </Grid>
          <Grid item sx={{ width: '100%' }}>
            <Switch>
              <Route exact path="/">
                <TryItButton />
              </Route>
              <Route exact path="/search">
                <PictogramSearch />
              </Route>
              <Route exact path="/collection">
                <PictogramCollection />
              </Route>
              <Route exact strict path="/pictogram/:language([a-z]{2})/:id(\d+)/:version([\-a-z0-9]+)?" component={PictogramConfigurator} />
            </Switch>
          </Grid>
          <Grid item>
            <Footer size={location.pathname === '/' ? 'normal' : 'small'} />
          </Grid>
        </Grid>
      }
    </Container>
  )
}

export default App;