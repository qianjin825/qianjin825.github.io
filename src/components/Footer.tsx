import { Mail, Github, BookOpen, Mic } from 'lucide-react';
import profile from '../data/profile.json';

const iconFor = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes('email') || l.includes('mail')) return <Mail size={16} />;
  if (l.includes('github')) return <Github size={16} />;
  if (l.includes('orcid')) return <BookOpen size={16} />;
  return null;
};

export function Footer() {
  return (
    <footer className="text-center py-12 px-6 text-sm text-ink-muted font-light border-t border-ink/10">
      <div className="flex justify-center gap-5 mb-4">
        {profile.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            aria-label={link.label}
            title={link.label}
            className="hover:text-ink transition-colors flex items-center gap-1.5"
          >
            {iconFor(link.label) ?? <span className="text-xs uppercase tracking-widest">{link.label}</span>}
          </a>
        ))}
        {profile.podcast && (
          <a
            href={profile.podcast.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Podcast: ${profile.podcast.name}`}
            title={profile.podcast.name}
            className="hover:text-ink transition-colors flex items-center gap-1.5"
          >
            <Mic size={16} />
          </a>
        )}
      </div>
      <p className="opacity-70">
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  );
}
