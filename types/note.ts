export interface Note{
	id: string;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	tag: 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';
};

export interface CreateNote {
  title: string;
  content?: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}
