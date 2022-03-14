import React from 'react';
import ReactDOM from 'react-dom';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import App from './App';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import { I18nextProvider } from "react-i18next";
import './locales';
import i18next from 'i18next';
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18next}>
        <ScopedCssBaseline>
          <HashRouter>
            <App />
          </HashRouter>
        </ScopedCssBaseline>
      </I18nextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('arasaac-pictogram-viewer-react')
);

