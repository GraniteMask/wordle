import { initialState, reducer } from '@/reducers/wordleReducer'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext, useReducer } from 'react'

export const WordleContext = createContext<any>({})

export default function App({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <WordleContext.Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </WordleContext.Provider>
  )
}
