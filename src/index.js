import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import theme from './theme';
import { getLibrary } from './utils';

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(theme.config.initialColorMode);
root.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <React.StrictMode>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </Web3ReactProvider>
    </React.StrictMode>
  </>
);
