import { Container, Grid } from '@mui/material';
import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import PictogramCollection from "./components/PictogramCollection";
import PictogramConfigurator from './components/PictogramConfigurator';
import PictogramSearch from './components/PictogramSearch';

const AppLayoutSwitch: React.FC = () => {
  const location = useLocation();
  
  return (
      <Container fixed>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent={location.pathname === '/' ? 'center' : 'flex-start'}
          py="3vh"
          style={{ minHeight: '100vh' }}
        >
          <Grid item className="app-header-wrapper" sx={{ width: location.pathname === '/' ? 'auto' : { xs: '100%', sm: '100%' } }}>
            <Header />
          </Grid>
          <Grid item sx={{ width: '100%' }}>
            <Switch>
              <Route exact path="/search">
                <PictogramSearch />
              </Route>
              <Route exact path="/collection">
                <PictogramCollection />
              </Route>
              <Route exact strict path="/pictogram/:language([a-z]{2})/:id(\d+)/:version([\-a-z0-9]+)?" component={PictogramConfigurator} />
            </Switch>
          </Grid>
          <Grid item className="app-footer-wrapper">
            <Footer />
          </Grid>
        </Grid>
      </Container>
  )
}

export default AppLayoutSwitch