import type { NextPage } from 'next'
import { FormEvent, useState } from 'react'

import { BadgeCheckIcon, ShieldCheckIcon } from '@heroicons/react/solid'

import Layout from '@/components/common/Layout'
import { useMutateAuth } from '@/hooks/useMutateAuth'

const Auth: NextPage = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
  } = useMutateAuth()

  const [isLogin, setIsLogin] = useState(true)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate()
    } else {
      registerMutation.mutate()
    }
  }

  return (
    <Layout title='Auth'>
      <ShieldCheckIcon className='mb-6 h-12 w-12 text-pink-500' />
      <form onSubmit={handleSubmit}>
        <div>
          <input
            required
            className='my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none'
            placeholder='Email'
            type='text'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        <div>
          <input
            required
            className='my-2 rounded border border-gray-300 px-3 py-2 text-sm  placeholder-gray-500 focus:border-indigo-500 focus:outline-none'
            placeholder='Password'
            type='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <div className='my-6 flex items-center justify-center text-sm'>
          <span
            className='cursor-pointer font-medium hover:text-indigo-500'
            onClick={() => setIsLogin(!isLogin)}
          >
            change mode ?
          </span>
        </div>
        <button
          className='group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700'
          type='submit'
        >
          <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
            <BadgeCheckIcon className='h-5 w-5' />
          </span>
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
    </Layout>
  )
}

export default Auth
