// import axios from "axios";
// import type { Note } from "../types/note";

// axios.defaults.baseURL = "https://notehub-public.goit.study/api";
// axios.defaults.headers.common.Authorization = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

// interface FetchNotesParams {
//   page?: number;
//   perPage?: number;
//   search?: string;
//   tag?: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
// }

// export interface FetchNotesResponse {
//   notes: Note[];
//   totalPages: number;
// }

// export const fetchNotes = async ({
//   page = 1,
//   perPage = 12,
//   search = "",
//   tag
// }: FetchNotesParams): Promise<FetchNotesResponse> => {
//   const { data } = await axios.get<FetchNotesResponse>("/notes", {
//     params: { page, perPage, search, tag },
//   });
//   return data;
// };

// export const fetchNoteById = async (id: string): Promise<Note> => {
//   const { data } = await axios.get<Note>(`/notes/${id}`);
//   return data;
// };


// export const createNote = async (payload: {
//   title: string;
//   content: string;
//   tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
// }): Promise<Note> => {
//   const { data } = await axios.post<Note>("/notes", payload);
//   return data;
// };

// export const deleteNote = async (id: string): Promise<Note> => {
//   const { data } = await axios.delete<Note>(`/notes/${id}`);
//   return data;
// };


import axios from 'axios';
import type { Note } from '../types/note';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common.Authorization = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

export interface NewNoteData {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
  tag,
}: {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}) => {
  const { data } = await axios.get<{ notes: Note[]; totalPages: number }>('/notes', {
    params: { page, perPage, search, tag },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axios.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (payload: NewNoteData): Promise<Note> => {
  const { data } = await axios.post<Note>('/notes', payload);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axios.delete<Note>(`/notes/${id}`);
  return data;
};
