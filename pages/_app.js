import * as React from 'react'
import { ThemeProvider } from 'theme-ui'

import Meta from '../components/meta'
import { Header } from '../components/header'
import theme from '../lib/theme'

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Meta />
      <Header />
      <Component px="64px" {...pageProps} />
    </ThemeProvider>
  )
}

export default App
