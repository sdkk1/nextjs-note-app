import { FC, FormEvent } from 'react'

import Spinner from '@/components/common/Spinner'
import { useMutateNote } from '@/hooks/useMutateNote'
import useStore from '@/store/store'
import { supabase } from '@/utils/supabase'

const NoteForm: FC = () => {
  const { editedNote, updateEditedNote } = useStore()
  const { createNoteMutation, updateNoteMutation } = useMutateNote()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (editedNote.id === '')
      createNoteMutation.mutate({
        content: editedNote.content,
        title: editedNote.title,
        user_id: supabase.auth.user()?.id,
      })
    else {
      updateNoteMutation.mutate({
        content: editedNote.content,
        id: editedNote.id,
        title: editedNote.title,
      })
    }
  }

  if (updateNoteMutation.isLoading || createNoteMutation.isLoading) {
    return <Spinner />
  }
  return (
    <form onSubmit={submitHandler}>
      <div>
        <input
          className='my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none'
          placeholder='title'
          type='text'
          value={editedNote.title}
          onChange={(e) =>
            updateEditedNote({ ...editedNote, title: e.target.value })
          }
        />
      </div>
      <div>
        <textarea
          className='my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none'
          cols={50}
          placeholder='content'
          rows={10}
          value={editedNote.content}
          onChange={(e) =>
            updateEditedNote({ ...editedNote, content: e.target.value })
          }
        />
      </div>
      <div className='my-2 flex justify-center'>
        <button
          className='ml-2 rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700'
          type='submit'
        >
          {editedNote.id ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
}

export default NoteForm
