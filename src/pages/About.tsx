import profile from '../data/profile.json';
import { MarkdownContent } from '../components/MarkdownContent';

export function About() {
  return (
    <article>
      <header className="mb-16 md:mb-20">
        <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight leading-[1.05] mb-6 text-balance">
          {profile.name}
        </h1>
        <p className="text-xl md:text-2xl font-serif italic font-light text-ink-muted leading-relaxed max-w-2xl">
          {profile.tagline}
        </p>
      </header>
      {profile.longBio && <MarkdownContent>{profile.longBio}</MarkdownContent>}
    </article>
  );
}
