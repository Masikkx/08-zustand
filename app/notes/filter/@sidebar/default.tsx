import css from './Sidebar.Notes.module.css';
import Link from 'next/link'

const tags = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

export default function SidebarNotes() {
  return (
    <aside className={css.sidebar}>
      <nav className={css.navigation}>
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link href={`/notes/filter/all`} className={css.menuLink} >All notes</Link>
          </li>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}


