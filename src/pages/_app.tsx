import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { QueryClient, QueryClientProvider } from 'react-query'

import { supabase } from '@/utils/supabase'

import '../styles/globals.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  const { push, pathname } = useRouter()

  supabase.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_IN' && pathname === '/') {
      push('/notes')
    }
    if (event === 'SIGNED_OUT' && pathname !== '/') {
      push('/')
    }
  })

  const validateSession = async () => {
    const user = supabase.auth.user()
    if (user && pathname === '/') {
      push('/notes')
    } else if (!user && pathname !== '/') {
      await push('/')
    }
  }

  useEffect(() => {
    validateSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
