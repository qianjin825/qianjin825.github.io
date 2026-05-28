import { Link } from 'react-router-dom';
import profile from '../data/profile.json';
import projectsData from '../data/projects.json';
import type { Project } from '../data/types';
import { ProjectCard } from '../components/ProjectCard';

const projects = projectsData as Project[];

export function Home() {
  const featured = projects
    .filter((p) => p.featured)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <>
      <section className="min-h-[70vh] flex flex-col justify-center">
        <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight leading-[1.1] mb-8 text-balance">
          {profile.tagline.split('—')[0].trim()}
          {profile.tagline.includes('—') && (
            <span className="italic opacity-80"> — {profile.tagline.split('—').slice(1).join('—').trim()}</span>
          )}
        </h1>

        <div className="max-w-2xl text-ink-muted font-light leading-relaxed space-y-6">
          <p>{profile.bio}</p>
          <div className="flex gap-4 pt-2">
            <Link
              to="/about"
              className="text-xs uppercase tracking-widest hover:text-ink hover:underline underline-offset-4"
            >
              More about me →
            </Link>
            <Link
              to="/publications"
              className="text-xs uppercase tracking-widest hover:text-ink hover:underline underline-offset-4"
            >
              Publications →
            </Link>
          </div>
        </div>
      </section>

      <hr className="border-t border-ink/10 my-24" />

      <section className="space-y-16">
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-light">Selected Work</h2>
          <Link
            to="/research"
            className="text-xs uppercase tracking-widest opacity-60 hover:opacity-100 hover:underline underline-offset-4"
          >
            All projects →
          </Link>
        </div>

        {featured.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </section>
    </>
  );
}
