export function useMarkdownEnv(): boolean {
  const raw = String(import.meta.env.VITE_APP_USE_MARKDOWN ?? '').trim().toLowerCase();
  const val = raw === 'true' || raw === '1' || raw === 'yes';
  if (typeof window !== 'undefined') {
    console.info('[env] VITE_APP_USE_MARKDOWN =', raw || '(empty)', '→', val ? 'markdown' : 'ts');
  }
  return val;
}
