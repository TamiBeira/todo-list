import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import {extendTheme} from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {AuthProvider} from '../context/AuthContext'

const colors = {
  todoList:{
    900: '#12131b',
    400: '#1b1c29',
    100: '#c6c6c6'
  },
  button:{
    cta: "#fba931",
    default: "#ffffff",
    gray: "#dfdfdf",
    danger: "#ff4040"
  },
  orange:{
    900: "#fba931"
  }
}

const theme = extendTheme({colors});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
    </>
  )
}

export default MyApp
