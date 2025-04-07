import React from 'react';
import { createRoot } from 'react-dom/client';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import App from './App';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import { I18nextProvider } from "react-i18next";
import './locales';
import i18next from './i18n';
import { HashRouter } from "react-router-dom";

const domNode = document.getElementById('arasaac-pictogram-viewer-react');

if(domNode) {
  const root = createRoot(domNode);
  root.render(
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
    </React.StrictMode>
  )
}