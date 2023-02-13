import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../../src/styles/Home.module.css'
import Layout from '../components/Layout'
import Tabela from '../components/Tabela'
import Cliente from '../core/Cliente'
import Botao from '../components/Botao'
import Formulario from '../components/Formulario'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())

  const clientes = [
    new Cliente('Ana', 34, '1'),
    new Cliente('João', 23, '2'),
    new Cliente('Maria', 16, '3'),
    new Cliente('Pedro', 29, '4'),
  ]

  function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente)
    setVisible('form')
  }

  function clienteExcluido(cliente: Cliente) {
    console.log(cliente.nome)
  }

  function salvarCliente(cliente: Cliente) {

    setVisible('tabela')
  }

  function novoCliente() {
    setCliente(Cliente.vazio())
    setVisible('form')
  }

  const [visible, setVisible] = useState<'tabela' | 'form'>('tabela');

  return (
        <div className={`
          flex h-screen justify-center items-center
          bg-gradient-to-r from-purple-600 to-blue-800
          text-white
        `}>
          <Layout titulo='Cadastro Simples'>
              {visible === 'tabela' ? (
                <>
                  <div className='flex justify-end'>
                    <Botao 
                    onClick={novoCliente} 
                    cor='green' 
                    className="mb-4">
                      Novo Cliente
                    </Botao>
                  </div>
                  <Tabela clientes={clientes} 
                    clienteSelecionado={clienteSelecionado} 
                    clienteExcluido={clienteExcluido} 
                  />
                </>
              ) : (
                <Formulario 
                  cliente={cliente}
                  clienteMudou={salvarCliente}
                  cancelado={() => setVisible('tabela')}
                />
              )}  
          </Layout>
        </div>
  )
}
