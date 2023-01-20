import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout'
import Board from '@/components/BoardComponent/Board'

export default function Home() {
  return (
    <Layout title='Wordle Game' description='Enjoy the wordle game'>
      <div className={styles.masterWrapper}>
        <Board />
      </div>     
    </Layout>
  )
}
