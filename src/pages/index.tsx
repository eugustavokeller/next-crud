import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../../src/styles/Home.module.css'
import Layout from '../components/Layout'
import Tabela from '../components/Tabela'
import Cliente from '../core/Cliente'
import Botao from '../components/Botao'
import Formulario from '../components/Formulario'
import { useEffect, useState } from 'react'
import ClienteRepositorio from '../core/ClienteRepositorio'
import ColecaoCliente from '../backend/db/ColecaoCliente'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const repo: ClienteRepositorio = new ColecaoCliente()

  const [clientes, setClientes] = useState<Cliente[]>([])
  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())

  useEffect(obterTodos, [])
  
  function obterTodos() {
    repo.obterTodos().then(clientes => {
      setClientes(clientes)
      setVisible('tabela')
    })
  }

  function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente)
    setVisible('form')
  }

  async function clienteExcluido(cliente: Cliente) {
    await repo.excluir(cliente)
    obterTodos()
  }

  async function salvarCliente(cliente: Cliente) {
    await repo.salvar(cliente)
    obterTodos()
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
