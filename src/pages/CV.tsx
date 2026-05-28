import { Download } from 'lucide-react';
import cvData from '../data/cv.json';
import type { CVEntry } from '../data/types';

const cv = cvData as CVEntry[];

const sectionOrder: { key: CVEntry['type']; label: string }[] = [
  { key: 'education', label: 'Education' },
  { key: 'appointment', label: 'Appointments' },
  { key: 'award', label: 'Awards & Grants' },
  { key: 'talk', label: 'Talks' },
  { key: 'service', label: 'Service' },
];

function EntryRow({ entry }: { entry: CVEntry }) {
  const dates = entry.end ? `${entry.start} – ${entry.end}` : `${entry.start} – present`;
  return (
    <article className="grid md:grid-cols-[1fr_3fr] gap-6 items-baseline">
      <div className="text-xs font-mono opacity-50 uppercase tracking-widest">{dates}</div>
      <div>
        <h3 className="text-base font-medium mb-1">{entry.title}</h3>
        {(entry.org || entry.location) && (
          <p className="text-sm text-ink-muted font-light">
            {entry.org}
            {entry.org && entry.location ? ' · ' : ''}
            {entry.location}
          </p>
        )}
        {entry.detail && (
          <p className="text-sm text-ink-muted/80 font-light mt-1 italic">{entry.detail}</p>
        )}
      </div>
    </article>
  );
}

export function CV() {
  return (
    <>
      <div className="flex items-baseline justify-between mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-light">CV</h1>
        <a
          href="/cv.pdf"
          download
          className="text-xs uppercase tracking-widest border border-ink/30 px-3 py-2 rounded hover:bg-accent hover:border-accent hover:text-white transition-colors flex items-center gap-2"
        >
          <Download size={14} /> Download PDF
        </a>
      </div>

      {cv.length === 0 && (
        <p className="text-ink-muted italic">CV in progress — check back soon.</p>
      )}

      <div className="space-y-16">
        {sectionOrder.map(({ key, label }) => {
          const entries = cv.filter((e) => e.type === key);
          if (entries.length === 0) return null;
          return (
            <section key={key}>
              <h2 className="font-serif text-2xl font-light mb-8 border-b border-ink/10 pb-3">
                {label}
              </h2>
              <div className="space-y-8">
                {entries.map((e, i) => (
                  <EntryRow key={`${e.type}-${i}`} entry={e} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
