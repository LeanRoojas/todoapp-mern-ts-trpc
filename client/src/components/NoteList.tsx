import { trpc } from "../trpc";
import NoteCard from "./NoteCard";

export default function NoteList() {
  const { data, isLoading, isError, error } = trpc.note.get.useQuery();

  console.log(data);
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      {data.map((note: any) => (
        <NoteCard note={note} key={note._id}/>
      ))}
    </>
  );
}
