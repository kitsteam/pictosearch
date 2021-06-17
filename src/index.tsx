import React from 'react';
import ReactDOM from 'react-dom';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import App from './App';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';



ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ScopedCssBaseline>
        <App />
      </ScopedCssBaseline>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('arasaac-pictogram-viewer-react')
);

