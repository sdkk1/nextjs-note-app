import Link from 'next/link'
import { FC } from 'react'

import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'

import Spinner from '@/components/common/Spinner'
import { useMutateNote } from '@/hooks/useMutateNote'
import useStore from '@/store/store'
import { supabase } from '@/utils/supabase'

type Props = {
  content: string
  id: string
  title: string
  user_id?: string
}

const NoteItem: FC<Props> = ({ content, id, title, user_id }) => {
  const { updateEditedNote } = useStore()
  const { deleteNoteMutation } = useMutateNote()

  const userId = supabase.auth.user()?.id

  if (deleteNoteMutation.isLoading) {
    return <Spinner />
  }
  return (
    <li className='my-3'>
      <Link
        href={`/note/${id}`}
        prefetch={false}
      >
        <a className='cursor-pointer hover:text-pink-600'>{title}</a>
      </Link>
      {userId === user_id && (
        <div className='float-right ml-20 flex'>
          <PencilAltIcon
            className='mx-1 h-5 w-5 cursor-pointer text-blue-500'
            onClick={() => {
              updateEditedNote({
                content: content,
                id: id,
                title: title,
              })
            }}
          />
          <TrashIcon
            className='h-5 w-5 cursor-pointer text-blue-500'
            onClick={() => {
              deleteNoteMutation.mutate(id)
            }}
          />
        </div>
      )}
    </li>
  )
}

export default NoteItem
