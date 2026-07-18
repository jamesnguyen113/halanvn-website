import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Tin tức / tư vấn: mỗi bài một file .md trong src/content/tin-tuc/.
// Frontmatter: title, description (meta), date (YYYY-MM-DD).
const tinTuc = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tin-tuc' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
  }),
});

export const collections = { 'tin-tuc': tinTuc };
