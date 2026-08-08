import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'AI SDLC Workshop',
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'Thai',
          lang: 'th',
        },
        en: {
          label: 'English',
          lang: 'en',
        },
      },
      sidebar: [
        {
          label: 'Workshop',
          items: [
            { label: 'Overview', slug: 'workshop/overview' },
            { label: 'Block 1: AI Tools', slug: 'workshop/block-1-ai-tools' },
            { label: 'Block 2: Prompting', slug: 'workshop/block-2-prompting' },
            { label: 'Block 3: Security', slug: 'workshop/block-3-security' },
            { label: 'Block 4: Loop Engineering', slug: 'workshop/block-4-loops' },
            { label: 'Block 5: Architecture', slug: 'workshop/block-5-architecture' },
          ],
        },
        {
          label: 'Code Quests',
          items: [
            { label: 'Quest 1: First AI Code', slug: 'quests/quest-1-first-code' },
            { label: 'Quest 2: Prompt Mastery', slug: 'quests/quest-2-prompts' },
            { label: 'Quest 3: Security', slug: 'quests/quest-3-security' },
            { label: 'Quest 4: Loop Engineering', slug: 'quests/quest-4-loops' },
            { label: 'Quest 5: Final Project', slug: 'quests/quest-5-project' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'GitHub Copilot', slug: 'reference/github-copilot' },
            { label: 'Claude Code', slug: 'reference/claude-code' },
            { label: 'CodeRabbit', slug: 'reference/code-rabbit' },
          ],
        },
      ],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/your-repo' },
      ],
    }),
  ],
});
