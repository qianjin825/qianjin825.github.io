import { ExternalLink } from 'lucide-react';
import type { Publication } from '../data/types';

export function PublicationItem({ pub }: { pub: Publication }) {
  return (
    <article className="group grid md:grid-cols-[1fr_3fr] gap-6 items-baseline">
      <div className="text-xs font-mono opacity-50 uppercase tracking-widest">{pub.year}</div>
      <div>
        <h3 className="text-base font-medium leading-snug mb-2 flex items-start gap-2">
          {pub.url ? (
            <a
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group-hover:text-accent transition-colors flex items-start gap-2"
            >
              {pub.title}
              <ExternalLink size={12} className="mt-1.5 opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </a>
          ) : (
            pub.title
          )}
        </h3>
        <p className="text-sm text-ink-muted font-light mb-1">{pub.authors.join(', ')}</p>
        {pub.venue && (
          <p className="text-xs uppercase tracking-widest opacity-50 italic font-light">{pub.venue}</p>
        )}
      </div>
    </article>
  );
}
