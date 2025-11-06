import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import theme from './theme';
import i18next from './i18n';

describe('App', () => {
    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <I18nextProvider i18n={i18next}>
                    <MemoryRouter>
                        <App />
                    </MemoryRouter>
                </I18nextProvider>
            </ThemeProvider>
        );

        // If we get here without errors, the app started successfully
        expect(document.body).toBeTruthy();
    });
});
