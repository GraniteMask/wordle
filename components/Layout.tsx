import Head from 'next/head'
import React from 'react'
import Navbar from './NavbarComponent/Navbar'

export default function Layout({title, description, children} : {title: string, description: string, children: React.ReactNode}) {
  return (
    <>
        <Head>
            <title>{title ? title : "The Wordle Clone"}The Wordle Clone</title>
            {description && <meta name="description" content={description}></meta>}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
        </Head>
        <main>
            <Navbar />
            {children}
        </main>
      
    </>
  )
}
