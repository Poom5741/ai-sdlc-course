import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'BlueBelt Dojo — AI SDLC Workshop',
      customCss: ['./src/styles/custom.css'],
      head: [
        {
          tag: 'script',
          attrs: { defer: true, src: '/js/progress-tracker.js' },
        },
      ],
      sidebar: [
        {
          label: 'Workshop',
          items: [
            { slug: 'workshop/overview' },
            {
              label: 'Block 1: AI Tools',
              items: [
                { slug: 'workshop/block-1-ai-tools' },
                { slug: 'quests/quest-1-first-code' },
                { slug: 'quests/quest-2-prompts' },
                { slug: 'quests/quest-3-security' },
              ],
            },
            {
              label: 'Block 2: Prompting',
              items: [
                { slug: 'workshop/block-2-prompting' },
                { slug: 'quests/quest-4-loops' },
                { slug: 'quests/quest-5-project' },
              ],
            },
            {
              label: 'Block 3: Security',
              items: [
                { slug: 'workshop/block-3-security' },
              ],
            },
            {
              label: 'Block 4: Loops',
              items: [
                { slug: 'workshop/block-4-loops' },
              ],
            },
            {
              label: 'Block 5: Architecture',
              items: [
                { slug: 'workshop/block-5-architecture' },
              ],
            },
            {
              label: 'Block 6: AI Pipeline',
              items: [
                { slug: 'workshop/block-6-ai-pipeline' },
              ],
            },
          ],
        },
        {
          label: 'Challenges',
          items: [
            { slug: 'challenges/setup-olympics' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { slug: 'reference/setup-guide' },
            { slug: 'reference/github-copilot' },
            { slug: 'reference/claude-code' },
            { slug: 'reference/code-rabbit' },
            { slug: 'reference/matt-skills' },
            { slug: 'reference/execution-skills' },
            { slug: 'reference/goal-system' },
          ],
        },
      ],
    }),
    tailwind(),
  ],
  site: 'https://bluebeltdojo.ai',
});
