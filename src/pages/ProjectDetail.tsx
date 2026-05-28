import { useParams, Link } from 'react-router-dom';
import { MarkdownContent } from '../components/MarkdownContent';

const rawMarkdowns = import.meta.glob('../content/projects/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const bySlug: Record<string, string> = {};
for (const [path, raw] of Object.entries(rawMarkdowns)) {
  const m = path.match(/([^/]+)\.md$/);
  if (m) bySlug[m[1]] = raw;
}

type Frontmatter = {
  title?: string;
  date?: string;
  tags?: string[];
  summary?: string;
};

/** Tiny YAML-frontmatter parser — handles strings and inline arrays only. */
function parseFrontmatter(raw: string): { data: Frontmatter; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const [, yaml, content] = match;
  const data: Record<string, any> = {};
  for (const line of yaml.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/);
    if (!m) continue;
    const [, key, valRaw] = m;
    let val: any = valRaw.trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val
        .slice(1, -1)
        .split(',')
        .map((s: string) => s.trim().replace(/^["']|["']$/g, ''))
        .filter((s: string) => s.length > 0);
    } else if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  }
  return { data, content: content.trim() };
}

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const raw = slug ? bySlug[slug] : undefined;

  if (!raw) {
    return (
      <div>
        <h1 className="font-serif text-4xl font-light mb-4">Project not found</h1>
        <Link to="/research" className="text-accent underline underline-offset-4">
          ← Back to research
        </Link>
      </div>
    );
  }

  const { data: fm, content: body } = parseFrontmatter(raw);
  const year = fm.date ? new Date(fm.date).getFullYear() : undefined;

  return (
    <article>
      <Link
        to="/research"
        className="text-xs uppercase tracking-widest opacity-60 hover:opacity-100 hover:underline underline-offset-4 mb-8 inline-block"
      >
        ← Research
      </Link>

      <header className="mb-12">
        {year && (
          <div className="text-xs font-mono opacity-50 uppercase tracking-widest mb-4">{year}</div>
        )}
        <h1 className="font-serif text-4xl md:text-5xl font-light leading-[1.15] mb-6 text-balance">
          {fm.title}
        </h1>
        {fm.summary && (
          <p className="text-ink-muted font-light max-w-2xl text-lg">{fm.summary}</p>
        )}
        {fm.tags && (
          <div className="flex gap-2 mt-6 text-xs font-medium uppercase tracking-wider opacity-50">
            {fm.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}
      </header>

      <MarkdownContent>{body}</MarkdownContent>
    </article>
  );
}
