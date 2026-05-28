import profile from '../data/profile.json';
import { MarkdownContent } from '../components/MarkdownContent';

export function About() {
  return (
    <article>
      <h1 className="font-serif text-4xl md:text-5xl font-light mb-12">About</h1>

      {profile.longBio && <MarkdownContent>{profile.longBio}</MarkdownContent>}

      <hr className="border-t border-ink/10 my-12" />

      <section>
        <h2 className="text-xs uppercase tracking-widest opacity-60 mb-4">Research areas</h2>
        <div className="flex flex-wrap gap-2">
          {profile.keywords.map((k) => (
            <span
              key={k}
              className="text-xs uppercase tracking-widest border border-ink/20 px-3 py-1 rounded-full"
            >
              {k}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xs uppercase tracking-widest opacity-60 mb-4">Affiliation</h2>
        <p className="text-ink-muted">{profile.affiliation}</p>
      </section>
    </article>
  );
}
