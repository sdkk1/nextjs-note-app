import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'

import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'

import Layout from '@/components/common/Layout'
import CommentForm from '@/components/pages/CommentForm'
import CommentItem from '@/components/pages/CommentItem'
import { Note } from '@/types/types'
import { supabase } from '@/utils/supabase'

type Props = {
  note: Note
}

const fetchAllNoteIds = async () => {
  const { data: ids } = await supabase.from('notes').select('id')

  return ids!.map((id) => {
    return {
      params: {
        id: String(id.id),
      },
    }
  })
}
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await fetchAllNoteIds()

  return {
    fallback: 'blocking',
    paths,
  }
}
export const getStaticProps: GetStaticProps = async (ctx) => {
  console.log('ISR invoked - detail page')

  const { data: note } = await supabase
    .from('notes')
    .select('*, comments(*)')
    .eq('id', ctx.params?.id)
    .single()

  return {
    props: {
      note,
    },
    revalidate: false,
  }
}

const NotePage: NextPage<Props> = ({ note }) => {
  return (
    <Layout title='NoteDetail'>
      <p className='text-3xl font-semibold text-blue-500'>{note.title}</p>
      <div className='m-8 rounded-lg p-4 shadow-lg'>
        <p>{note.content}</p>
      </div>
      <ul className='my-2'>
        {note.comments?.map((comment) => (
          <CommentItem
            key={comment.id}
            content={comment.content}
            id={comment.id}
            user_id={comment.user_id}
          />
        ))}
      </ul>
      <CommentForm noteId={note.id} />
      <Link
        passHref
        href='/notes'
        prefetch={false}
      >
        <ChevronDoubleLeftIcon className='my-6 h-6 w-6 cursor-pointer text-blue-500' />
      </Link>
    </Layout>
  )
}

export default NotePage
