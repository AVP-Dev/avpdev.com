'use client'

import { ChakraProvider } from '@chakra-ui/react'

// Здесь мы можем в будущем кастомизировать тему Chakra UI,
// чтобы она соответствовала основному сайту.
// import { extendTheme } from '@chakra-ui/react'
// const theme = extendTheme({ ... })

export function Providers({ children }: { children: React.ReactNode }) {
  // return <ChakraProvider theme={theme}>{children}</ChakraProvider>
  return <ChakraProvider>{children}</ChakraProvider>
}
