export type Publication = {
  title: string;
  authors: string[];
  year: number;
  venue?: string;
  doi?: string;
  url?: string;
  type: 'journal-article' | 'book-chapter' | 'conference-paper' | 'preprint' | 'other';
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  date: string;
  featured?: boolean;
  hero?: string;
};

export type CVEntry = {
  type: 'education' | 'appointment' | 'award' | 'talk' | 'service';
  title: string;
  org?: string;
  location?: string;
  start: string;
  end?: string;
  detail?: string;
};

export type Profile = {
  name: string;
  affiliation: string;
  tagline: string;
  bio: string;
  longBio?: string;
  links: { label: string; href: string }[];
  podcast?: { name: string; url: string; description?: string };
  keywords: string[];
  avatar?: string;
  orcid: string;
};
