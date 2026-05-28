import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/types';

export function ProjectCard({ project, year }: { project: Project; year?: string }) {
  return (
    <Link
      to={`/research/${project.slug}`}
      className="group grid md:grid-cols-[1fr_2fr] gap-8 items-baseline no-underline"
    >
      <div className="text-xs font-mono opacity-50 uppercase tracking-widest">
        {year ?? new Date(project.date).getFullYear()}
      </div>
      <div>
        <h3 className="text-xl font-medium mb-3 group-hover:text-accent transition-colors flex items-center gap-2">
          {project.title}
          <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </h3>
        <p className="text-ink-muted font-light mb-4">{project.summary}</p>
        <div className="flex gap-2 text-xs font-medium uppercase tracking-wider opacity-50">
          {project.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
