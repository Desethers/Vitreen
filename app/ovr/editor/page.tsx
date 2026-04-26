import { redirect } from 'next/navigation'

// Redirect to the first step of the editor
export default function EditorPage() {
  redirect('/ovr/editor/create')
}
