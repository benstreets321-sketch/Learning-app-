import { marked } from 'marked';
import { memo, useMemo } from 'react';

marked.setOptions({ gfm: true, breaks: false });

// Light extension: ::: callouts  (:::tip / :::warn / :::exam / :::key)
function preprocess(src: string): string {
  return src.replace(/^:::(tip|warn|exam|key|example)\s*(.*)\n([\s\S]*?)^:::\s*$/gm, (_m, kind: string, title: string, body: string) => {
    const label = title || { tip: 'Tip', warn: 'Watch out', exam: 'Exam focus', key: 'Key idea', example: 'Example' }[kind];
    const inner = marked.parse(body, { async: false }) as string;
    return `<div class="callout callout-${kind}"><div class="callout-title">${label}</div>${inner}</div>\n`;
  });
}

export const Markdown = memo(function Markdown({ text, inline = false, className = '' }: { text: string; inline?: boolean; className?: string }) {
  const html = useMemo(() => {
    if (inline) return marked.parseInline(text, { async: false }) as string;
    return marked.parse(preprocess(text), { async: false }) as string;
  }, [text, inline]);
  if (inline) return <span className={`md-inline ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
  return <div className={`md ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
});
