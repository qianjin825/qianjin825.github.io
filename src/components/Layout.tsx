import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen font-sans selection:bg-accent selection:text-white flex flex-col">
      <Navigation />
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-24 md:py-32">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
