import projectsData from '../data/projects.json';
import type { Project } from '../data/types';
import { ProjectCard } from '../components/ProjectCard';

const projects = projectsData as Project[];

export function Research() {
  const sorted = [...projects].sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <>
      <h1 className="font-serif text-4xl md:text-5xl font-light mb-4">Research</h1>
      <p className="text-ink-muted font-light mb-16 max-w-2xl">
        Active and recent research projects. Each clusters several papers around a shared question.
      </p>

      <div className="space-y-16">
        {sorted.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </>
  );
}
