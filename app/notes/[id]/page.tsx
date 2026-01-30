import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";


interface NotePageProps {
  params: Promise<{
    id: string;
  }>;
}



export async function generateMetadata(
  { params }: NotePageProps
): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);

    return {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 100),
      openGraph: {
        title: `Note: ${note.title}`,
        description: note.content.slice(0, 100),
        url: `https://08-zustand-eight-pied.vercel.app/notes/${id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: "Note details",
      description: "Note details page",
    };
  }
}


export default async function NotePage({ params }: NotePageProps) {
  const queryClient = new QueryClient();
  const {id}=await params;

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}