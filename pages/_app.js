import * as React from 'react'
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Meta from '../components/meta'
import { Header } from '../components/header'
import { YMaps } from "react-yandex-maps";

const theme = createTheme()

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
        <Meta />
        <Header />
        <YMaps>
            <Component {...pageProps} />
        </YMaps>
    </ThemeProvider>
  )
}

export default App
