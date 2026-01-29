import type { Metadata } from "next";
import  css from"./globals.module.css";
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "NoteHub",
    description: "A platform to share your notes with the world.",
    openGraph: {
      title: "NoteHub",
      description: "NoteHub - A platform to share your notes with the world.",
      url: "https://08-zustand-p6qvz852v-masikkx.vercel.app/",
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
  };
}



export default function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
return (
 <html lang="en">
      <body className={css.body}>
        <TanStackProvider>
          <Header />
          {children}
          {modal && modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}


