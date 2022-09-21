import { FC, FormEvent } from 'react'

import Spinner from '@/components/common/Spinner'
import { useMutateComment } from '@/hooks/useMutateComment'
import useStore from '@/store/store'
import { supabase } from '@/utils/supabase'

type Props = {
  noteId: string
}

const CommentForm: FC<Props> = ({ noteId }) => {
  const { editedComment, updateEditedComment } = useStore()
  const { createCommentMutation, updateCommentMutation } = useMutateComment()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedComment.id === '') {
      createCommentMutation.mutate({
        content: editedComment.content,
        note_id: noteId,
        user_id: supabase.auth.user()?.id,
      })
    } else {
      updateCommentMutation.mutate({
        content: editedComment.content,
        id: editedComment.id,
      })
    }
  }

  if (updateCommentMutation.isLoading || createCommentMutation.isLoading) {
    return <Spinner />
  }
  return (
    <form onSubmit={submitHandler}>
      <input
        className='my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none'
        placeholder='new comment'
        type='text'
        value={editedComment.content}
        onChange={(e) =>
          updateEditedComment({ ...editedComment, content: e.target.value })
        }
      />
      <button
        className='ml-2 rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700'
        type='submit'
      >
        {editedComment.id ? 'Update' : 'Send'}
      </button>
    </form>
  )
}

export default CommentForm
