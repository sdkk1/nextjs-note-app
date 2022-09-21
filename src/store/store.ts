import create from 'zustand'

import { State } from '@/types/types'

const useStore = create<State>((set) => ({
  editedComment: { content: '', id: '' },
  editedNote: { content: '', id: '', title: '' },
  resetEditedComment: () => set({ editedComment: { content: '', id: '' } }),
  resetEditedNote: () =>
    set({ editedNote: { content: '', id: '', title: '' } }),
  updateEditedComment: (payload) =>
    set({
      editedComment: {
        content: payload.content,
        id: payload.id,
      },
    }),
  updateEditedNote: (payload) =>
    set({
      editedNote: {
        content: payload.content,
        id: payload.id,
        title: payload.title,
      },
    }),
}))

export default useStore
