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
            'workshop/overview',
            'workshop/block-1-ai-tools',
            'workshop/block-2-prompting',
            'workshop/block-3-security',
            'workshop/block-4-loops',
            'workshop/block-5-architecture',
          ],
        },
        {
          label: 'Quests',
          items: [
            'quests/quest-1-first-code',
            'quests/quest-2-prompts',
            'quests/quest-3-security',
            'quests/quest-4-loops',
            'quests/quest-5-project',
          ],
        },
        {
          label: 'Reference',
          items: [
            'reference/github-copilot',
            'reference/claude-code',
            'reference/code-rabbit',
          ],
        },
      ],
      social: {
        github: 'https://github.com/Poom5741/ai-sdlc-course',
      },
    }),
  ],
});
