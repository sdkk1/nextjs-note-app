export type Comment = {
  content: string
  created_at: string
  id: string
  note_id: string
  user_id?: string
}
export type CreatedComment = Omit<Comment, 'created_at' | 'id'>
export type EditedComment = Omit<Comment, 'created_at' | 'user_id' | 'note_id'>

export type Note = {
  comments: Comment[]
  content: string
  created_at: string
  id: string
  title: string
  user_id?: string
}
export type CreatedNote = Omit<Note, 'created_at' | 'id' | 'comments'>
export type EditedNote = Omit<Note, 'created_at' | 'user_id' | 'comments'>

export type State = {
  editedComment: EditedComment
  editedNote: EditedNote
  resetEditedComment: () => void
  resetEditedNote: () => void
  updateEditedComment: (payload: EditedComment) => void
  updateEditedNote: (payload: EditedNote) => void
}
