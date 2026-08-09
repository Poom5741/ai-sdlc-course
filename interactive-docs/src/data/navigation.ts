export const pageOrder = [
  { title: 'Workshop Overview', url: '/workshop/overview' },
  { title: 'Block 1: AI Tools', url: '/workshop/block-1-ai-tools' },
  { title: 'Block 2: Prompting', url: '/workshop/block-2-prompting' },
  { title: 'Block 3: Security', url: '/workshop/block-3-security' },
  { title: 'Block 4: Loops', url: '/workshop/block-4-loops' },
  { title: 'Block 5: Architecture', url: '/workshop/block-5-architecture' },
];

export function getPrevNext(currentUrl: string) {
  const index = pageOrder.findIndex(p => p.url === currentUrl);
  if (index === -1) return { prev: null, next: null };
  
  return {
    prev: index > 0 ? pageOrder[index - 1] : null,
    next: index < pageOrder.length - 1 ? pageOrder[index + 1] : null,
  };
}
