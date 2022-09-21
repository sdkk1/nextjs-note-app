import Head from 'next/head'
import { FC, ReactNode } from 'react'

import { BadgeCheckIcon } from '@heroicons/react/solid'

type Props = {
  children: ReactNode
  title: string
}

const Layout: FC<Props> = ({ title = 'Todo app', children }) => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center font-mono text-gray-800'>
      <Head>
        <title>{title}</title>
      </Head>
      <header></header>
      <main className='flex w-screen flex-1 flex-col items-center justify-center'>
        {children}
      </main>
      <footer className='flex h-12 w-full items-center justify-center border-t'>
        <BadgeCheckIcon className='h-6 w-6 text-blue-500' />
      </footer>
    </div>
  )
}

export default Layout
