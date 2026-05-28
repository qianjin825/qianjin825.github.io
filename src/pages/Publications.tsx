import publicationsData from '../data/publications.json';
import extraData from '../data/publications.extra.json';
import type { Publication } from '../data/types';
import { PublicationItem } from '../components/PublicationItem';

// Merge auto-fetched (ORCID + Crossref) with manual extras; dedup by DOI.
const seen = new Set<string>();
const publications: Publication[] = [
  ...(publicationsData as Publication[]),
  ...(extraData as Publication[]),
].filter((p) => {
  const key = p.doi ?? p.title;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

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
      <h1 className="font-serif text-4xl md:text-5xl font-light mb-16">Publications</h1>

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
