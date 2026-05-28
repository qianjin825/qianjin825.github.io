import { NavLink, Link } from 'react-router-dom';
import profile from '../data/profile.json';

const navItems = [
  { to: '/about', label: 'About' },
  { to: '/research', label: 'Research' },
  { to: '/publications', label: 'Publications' },
  // { to: '/cv', label: 'CV' }, // hidden — un-comment when CV is ready
];

export function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 text-ink p-6 md:p-12 flex justify-between items-start pointer-events-none">
      <Link
        to="/"
        className="font-serif italic text-lg opacity-80 hover:opacity-100 transition-opacity pointer-events-auto"
      >
        {profile.name}
      </Link>
      <div className="text-xs uppercase tracking-widest font-medium pointer-events-auto flex gap-6 opacity-60 hover:opacity-100 transition-opacity">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `hover:underline underline-offset-4 ${isActive ? 'underline text-accent' : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
