import { ChangeEvent, FormEvent, useState } from "react";
import { trpc } from "../trpc";

const initialState = {
  title: '',
  description: '',
}

function NoteForm() {
  const [note, setNote] = useState(initialState);

  const addNote  = trpc.note.create.useMutation()

  const utils = trpc.useContext()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(note);
    addNote.mutate(note, {
      onSuccess: (res) => {
        console.log(res);
        console.log('added note susccessfully');
        utils.note.get.invalidate()
        setNote(initialState)
      }
    })

  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNote({...note,[e.target.name]: e.target.value})

  };

  return (
    <form onSubmit={handleSubmit}
      className="bg-zinc-900 p-10 rounded-md">
      <input value={note.title} type="text" name="title" placeholder="title" autoFocus onChange={handleChange} 
      className="bg-neutral-800 px-3 py-2 w-full block rounded-md mb-3"/>

      <textarea value={note.description} name="description" placeholder="description" onChange={handleChange}
      className="bg-neutral-800 px-3 py-2 w-full block rounded-md mb-3 resize-none"></textarea>
      <button
      className="bg-zinc-500 px-3 py-2 rounded-md text-white uppercase font-bold font-sans">Save</button>
    </form>
  );
}

export default NoteForm;
