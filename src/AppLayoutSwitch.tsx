import { Container, Grid } from '@mui/material';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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
            <Routes>
              <Route path="/search" element={<PictogramSearch />} />
              <Route path="/collection" element={<PictogramCollection />} />
              <Route path="/pictogram/:language/:id/:version?" element={<PictogramConfigurator />} />
            </Routes>
          </Grid>
        </Grid>
      </Container>
  )
}

export default AppLayoutSwitch