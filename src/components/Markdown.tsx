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

/** Typographic tidy-up of rendered text (not code): spaced hyphens become en dashes. */
function typeset(html: string): string {
  return html.replace(/(<code[\s\S]*?<\/code>|<pre[\s\S]*?<\/pre>)|(<[^>]+>)|([^<]+)/g, (m, code, tag, text) => {
    if (code || tag) return m;
    // leave maths like "7 - 3" or "x - 2" alone: only convert between words
    return text.replace(/([A-Za-z.)'’”%;:]{2}) - (?=[A-Za-z"“(‘'£]{2})/g, '$1 – ');
  });
}

export const Markdown = memo(function Markdown({ text, inline = false, className = '' }: { text: string; inline?: boolean; className?: string }) {
  const html = useMemo(() => {
    if (inline) return typeset(marked.parseInline(text, { async: false }) as string);
    return typeset(marked.parse(preprocess(text), { async: false }) as string);
  }, [text, inline]);
  if (inline) return <span className={`md-inline ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
  return <div className={`md ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
});
