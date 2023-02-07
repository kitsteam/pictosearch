import { Container } from '@mui/material';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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
          <Routes>
            <Route path="/search" element={<PictogramSearch />} />
            <Route path="/collection" element={<PictogramCollection />} />
            <Route path="/pictogram/:language([a-z]{2})/:id(\d+)/:version([\-a-z0-9]+)?" element={<PictogramConfigurator />} />
            <Route
              path="*"
              element={<Navigate to="/search" replace />}
            />
          </Routes>
        </Container>
        :
        <>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="*" element={<AppLayoutSwitch />} />
          </Routes>
        </>
      }
    </>
  )
}

export default App;