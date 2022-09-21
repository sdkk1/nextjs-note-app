import { useMutation } from 'react-query'

import useStore from '@/store/store'
import { CreatedNote, EditedNote } from '@/types/types'
import { revalidateSingle } from '@/utils/revalidation'
import { supabase } from '@/utils/supabase'

export const useMutateNote = () => {
  const { resetEditedNote } = useStore()

  const createNoteMutation = useMutation(
    async (note: CreatedNote) => {
      const { data, error } = await supabase.from('notes').insert(note)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onError: (err: Error) => {
        alert(err.message)
        resetEditedNote()
      },
      onSuccess: () => {
        resetEditedNote()
        alert('Successfully completed !!')
      },
    }
  )
  const deleteNoteMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase.from('notes').delete().eq('id', id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onError: (err: Error) => {
        alert(err.message)
        resetEditedNote()
      },
      onSuccess: () => {
        resetEditedNote()
        alert('Successfully completed !!')
      },
    }
  )
  const updateNoteMutation = useMutation(
    async (note: EditedNote) => {
      const { data, error } = await supabase
        .from('notes')
        .update({ content: note.content, title: note.title })
        .eq('id', note.id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onError: (err: Error) => {
        alert(err.message)
        resetEditedNote()
      },
      onSuccess: (res) => {
        revalidateSingle(res[0].id)
        resetEditedNote()
        alert('Successfully completed !!')
      },
    }
  )

  return {
    createNoteMutation,
    deleteNoteMutation,
    updateNoteMutation,
  }
}
