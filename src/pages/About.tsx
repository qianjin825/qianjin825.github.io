import profile from '../data/profile.json';
import { MarkdownContent } from '../components/MarkdownContent';

export function About() {
  return (
    <article>
      <h1 className="font-serif text-4xl md:text-5xl font-light mb-12">About</h1>
      {profile.longBio && <MarkdownContent>{profile.longBio}</MarkdownContent>}
    </article>
  );
}
