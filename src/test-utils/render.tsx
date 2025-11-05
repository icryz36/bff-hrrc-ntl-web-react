import type { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BreakpointsProvider from 'providers/BreakpointsProvider';
import NotistackProvider from 'providers/NotistackProvider';
import SettingsPanelProvider from 'providers/SettingsPanelProvider';
import SettingsProvider from 'providers/SettingsProvider';
import ThemeProvider from 'providers/ThemeProvider';
import { queryClient } from 'services/client';
import '../locales/i18n';

// ----------------------------------------------------------------------

type WrapperProps = {
  children: ReactNode;
};

// ----------------------------------------------------------------------

type RouterOptions = {
  path?: string;
  route?: string;
  history?: string[];
};

const renderWithRouter = (ui: ReactElement, options: RouterOptions = {}) => {
  const { path = '/', route = path, history = [route] } = options;

  userEvent.setup();

  const Wrapper = ({ children }: WrapperProps) => (
    <MemoryRouter initialEntries={history} initialIndex={history.length - 1}>
      <QueryClientProvider client={queryClient}>
        <SettingsProvider>
          <ThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <NotistackProvider>
                <BreakpointsProvider>
                  <SettingsPanelProvider>{children}</SettingsPanelProvider>
                </BreakpointsProvider>
              </NotistackProvider>
            </LocalizationProvider>
          </ThemeProvider>
        </SettingsProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );

  return {
    user: userEvent.setup(),
    history,
    route,
    ...render(ui, { wrapper: Wrapper }),
  };
};

export * from '@testing-library/react';
export { renderWithRouter as render };
