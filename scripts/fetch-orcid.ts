/**
 * Fetch publications from ORCID public API and write to src/data/publications.json.
 *
 * Run automatically before `vite build` via the `prebuild` npm script.
 * Read-fail-safe: on any failure, leaves the existing JSON file untouched
 * and exits 0 so a transient API outage doesn't break the GitHub Actions deploy.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

type Publication = {
  title: string;
  authors: string[];
  year: number;
  venue?: string;
  doi?: string;
  url?: string;
  type: 'journal-article' | 'book-chapter' | 'conference-paper' | 'preprint' | 'other';
};

const PROFILE_PATH = resolve('src/data/profile.json');
const OUTPUT_PATH = resolve('src/data/publications.json');

function getOrcidId(): string {
  const fromEnv = process.env.ORCID_ID?.trim();
  if (fromEnv) return fromEnv;
  const profile = JSON.parse(readFileSync(PROFILE_PATH, 'utf8'));
  if (!profile.orcid) throw new Error('No ORCID iD: env ORCID_ID unset and profile.json has no orcid field');
  return profile.orcid;
}

async function orcidGet(path: string): Promise<any> {
  const res = await fetch(`https://pub.orcid.org/v3.0${path}`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`ORCID ${path} → ${res.status} ${res.statusText}`);
  return res.json();
}

function mapType(t: string | undefined): Publication['type'] {
  switch (t) {
    case 'journal-article':
    case 'book-chapter':
    case 'conference-paper':
    case 'preprint':
      return t;
    default:
      return 'other';
  }
}

function extractDoi(work: any): string | undefined {
  const ids = work?.['external-ids']?.['external-id'] ?? [];
  for (const id of ids) {
    if (id?.['external-id-type'] === 'doi') {
      const v = id?.['external-id-value'];
      if (typeof v === 'string') return v.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '');
    }
  }
  return undefined;
}

function extractAuthors(work: any): string[] {
  const list = work?.contributors?.contributor ?? [];
  return list
    .map((c: any) => c?.['credit-name']?.value)
    .filter((s: any) => typeof s === 'string' && s.length > 0);
}

async function main() {
  const orcid = getOrcidId();
  console.log(`[fetch-orcid] ORCID = ${orcid}`);

  const works = await orcidGet(`/${orcid}/works`);
  const groups: any[] = works?.group ?? [];
  const putCodes: number[] = [];
  for (const g of groups) {
    const summaries: any[] = g?.['work-summary'] ?? [];
    if (summaries.length > 0) {
      const putCode = summaries[0]?.['put-code'];
      if (typeof putCode === 'number') putCodes.push(putCode);
    }
  }
  console.log(`[fetch-orcid] ${putCodes.length} works found`);

  const results: Publication[] = [];
  for (const code of putCodes) {
    try {
      const w = await orcidGet(`/${orcid}/work/${code}`);
      const title: string | undefined = w?.title?.title?.value;
      const year: number | undefined = Number(w?.['publication-date']?.year?.value);
      if (!title || !year || Number.isNaN(year)) continue;
      const doi = extractDoi(w);
      results.push({
        title,
        authors: extractAuthors(w),
        year,
        venue: w?.['journal-title']?.value ?? undefined,
        doi,
        url: w?.url?.value || (doi ? `https://doi.org/${doi}` : undefined),
        type: mapType(w?.type),
      });
    } catch (err) {
      console.warn(`[fetch-orcid] skipped put-code ${code}: ${(err as Error).message}`);
    }
  }

  results.sort((a, b) => b.year - a.year);
  writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2) + '\n');
  console.log(`[fetch-orcid] wrote ${results.length} publications → ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.warn(`[fetch-orcid] FAILED, keeping previous JSON: ${err.message}`);
  process.exit(0);
});
