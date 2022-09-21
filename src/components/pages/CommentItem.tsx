import { FC } from 'react'

import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'

import Spinner from '@/components/common/Spinner'
import { useMutateComment } from '@/hooks/useMutateComment'
import useStore from '@/store/store'
import { supabase } from '@/utils/supabase'

type Props = {
  content: string
  id: string
  user_id?: string
}

const CommentItem: FC<Props> = ({ content, id, user_id }) => {
  const { updateEditedComment } = useStore()
  const { deleteCommentMutation } = useMutateComment()

  const userId = supabase.auth.user()?.id

  if (deleteCommentMutation.isLoading) {
    return <Spinner />
  }
  return (
    <li className='my-3'>
      <span>{content}</span>
      {userId === user_id && (
        <div className='float-right ml-20 flex'>
          <PencilAltIcon
            className='mx-1 h-5 w-5 cursor-pointer text-blue-500'
            onClick={() => {
              updateEditedComment({
                content: content,
                id: id,
              })
            }}
          />
          <TrashIcon
            className='h-5 w-5 cursor-pointer text-blue-500'
            onClick={() => {
              deleteCommentMutation.mutate(id)
            }}
          />
        </div>
      )}
    </li>
  )
}

export default CommentItem
