import { GetStaticProps, NextPage } from 'next'

import { DocumentTextIcon, LogoutIcon } from '@heroicons/react/solid'

import Layout from '@/components/common/Layout'
import NoteForm from '@/components/pages/NoteForm'
import NoteItem from '@/components/pages/NoteItem'
import { Note } from '@/types/types'
import { supabase } from '@/utils/supabase'

type Props = {
  notes: Note[]
}

export const getStaticProps: GetStaticProps = async () => {
  console.log('ISR invoked - notes page')

  const { data: notes, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    throw new Error(`${error.message}: ${error.details}`)
  }

  return {
    props: { notes },
    revalidate: false,
  }
}

const Notes: NextPage<Props> = ({ notes }) => {
  const signOut = () => {
    supabase.auth.signOut()
  }

  return (
    <Layout title='Notes'>
      <LogoutIcon
        className='mb-6 h-6 w-6 cursor-pointer text-blue-500'
        onClick={signOut}
      />
      <DocumentTextIcon className='h-8 w-8 text-blue-500' />
      <ul className='my-2'>
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            content={note.content}
            id={note.id}
            title={note.title}
            user_id={note.user_id}
          />
        ))}
      </ul>
      <NoteForm />
    </Layout>
  )
}

export default Notes
