import '@/styles/globals.css';
import '@/styles/variables.css';
import type { AppProps } from 'next/app';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from "next-auth/react"

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
  );
}
