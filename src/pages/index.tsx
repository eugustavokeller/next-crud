import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../../src/styles/Home.module.css'
import Layout from '../components/Layout'
import Tabela from '../components/Tabela'
import Cliente from '../core/Cliente'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const clientes = [
    new Cliente('Ana', 34, '1'),
    new Cliente('João', 23, '2'),
    new Cliente('Maria', 16, '3'),
    new Cliente('Pedro', 29, '4'),
  ]

  return (
        <div className={`
          flex h-screen justify-center items-center
          bg-gradient-to-r from-purple-600 to-blue-800
          text-white
        `}>
          <Layout titulo='Cadastro Simples'>
            <Tabela clientes={clientes}></Tabela>
          </Layout>
        </div>
  )
}
