import { publicProcedure, router } from "../trpc";
import z from "zod";
import Note from "../models/note";

const getNotes = publicProcedure.query(async () => {
  const notes = await Note.find();
  return notes;
});

const noteSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const createNote = publicProcedure.input(noteSchema).mutation(async ({ input }) => {
  const newNote = new Note(input);
  const savedNote = await newNote.save();
  return savedNote;
});

const deleteNote = publicProcedure.input(z.string()).mutation(async ({ input }) => {
  const noteFound = await Note.findByIdAndDelete(input);
  if (!noteFound) throw new Error("Note not found");
  return true;
});

const toggleDone = publicProcedure.input(z.string()).mutation(async ({ input }) => {
  try {
    const noteFound = await Note.findById(input);
    if (!noteFound) throw new Error("Note not found");
    noteFound.done = !noteFound.done;
    await noteFound.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
});

export const notesRouter = router({
  get: getNotes,
  create: createNote,
  delete: deleteNote,
  toggleDone,
});
