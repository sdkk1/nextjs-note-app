import { useMutation } from 'react-query'

import useStore from '@/store/store'
import { CreatedComment, EditedComment } from '@/types/types'
import { revalidateSingle } from '@/utils/revalidation'
import { supabase } from '@/utils/supabase'

export const useMutateComment = () => {
  const { resetEditedComment } = useStore()

  const createCommentMutation = useMutation(
    async (comment: CreatedComment) => {
      const { data, error } = await supabase.from('comments').insert(comment)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onError: (err: Error) => {
        alert(err.message)
        resetEditedComment()
      },
      onSuccess: (res) => {
        revalidateSingle(res[0].note_id)
        resetEditedComment()
        alert('Successfully completed !!')
      },
    }
  )
  const deleteCommentMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onError: (err: Error) => {
        alert(err.message)
        resetEditedComment()
      },
      onSuccess: (res) => {
        revalidateSingle(res[0].note_id)
        resetEditedComment()
        alert('Successfully completed !!')
      },
    }
  )
  const updateCommentMutation = useMutation(
    async (comment: EditedComment) => {
      const { data, error } = await supabase
        .from('comments')
        .update({ content: comment.content })
        .eq('id', comment.id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onError: (err: Error) => {
        alert(err.message)
        resetEditedComment()
      },
      onSuccess: (res) => {
        revalidateSingle(res[0].note_id)
        resetEditedComment()
        alert('Successfully completed !!')
      },
    }
  )

  return {
    createCommentMutation,
    deleteCommentMutation,
    updateCommentMutation,
  }
}
