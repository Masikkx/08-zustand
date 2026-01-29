import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";


interface NotePageProps {
  params: Promise<{
    id: string;
  }>;
}

// export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
//   const { id } = await params
//   const note = await fetchNoteById(id)
//   return {
//     title: `Note: ${note.title}`,
//     description: note.content.slice(0, 30),
//   }
// }

// export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
//   const { id } = await params
//   const note = await fetchNoteById(id)
//   return {
//     title: `Note: ${note.title}`,
//     description: note.content.slice(0, 30),
//     openGraph: {
//       title: `Note: ${note.title}`,
//       description: note.content.slice(0, 100),
//       url: `https://notehub.com/notes/${id}`,
//       siteName: 'NoteHub',
//       images: [
//         {
//           url: 'https://placehold.co/1200x630',
//           width: 1200,
//           height: 630,
//           alt: note.title,
//         },
//       ],
//       type: 'article',
//     },
//     twitter: {
// 	    card: 'summary_large_image',
//       title: `${note.title}`,
//       description: note.content,
//       images: ['https://ac.goit.global/fullstack/react/og-meta.jpg'],
//     },
//   }
// }
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