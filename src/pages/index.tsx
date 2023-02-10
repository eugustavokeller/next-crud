import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../../src/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
        <div className={`
          flex h-screen justify-center items-center
          bg-gradient-to-r from-purple-600 to-blue-800
        `}>
          <span className={`
            text-4xl
            `}>
              Texto
          </span>
        </div>
  )
}
