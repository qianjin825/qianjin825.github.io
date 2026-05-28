import publicationsData from '../data/publications.json';
import type { Publication } from '../data/types';
import { PublicationItem } from '../components/PublicationItem';

const publications = publicationsData as Publication[];

export function Publications() {
  const byYear: Record<number, Publication[]> = {};
  for (const p of publications) {
    (byYear[p.year] ??= []).push(p);
  }
  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <>
      <h1 className="font-serif text-4xl md:text-5xl font-light mb-4">Publications</h1>
      <p className="text-ink-muted font-light mb-16 max-w-2xl">
        Synced daily from{' '}
        <a
          href="https://orcid.org/0000-0002-6169-9615"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-accent"
        >
          ORCID
        </a>
        .
      </p>

      {publications.length === 0 && (
        <p className="text-ink-muted italic">No publications yet — check back soon.</p>
      )}

      <div className="space-y-16">
        {years.map((year) => (
          <section key={year}>
            <h2 className="font-serif text-2xl font-light mb-8 border-b border-ink/10 pb-3">{year}</h2>
            <div className="space-y-10">
              {byYear[year].map((p) => (
                <PublicationItem key={`${p.year}-${p.title}`} pub={p} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
