import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function MarkdownContent({ children }: { children: string }) {
  return (
    <div className="prose-custom text-ink-muted font-light leading-relaxed space-y-5 max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-serif text-3xl md:text-4xl font-light text-ink mt-12 mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-serif text-2xl md:text-3xl font-light text-ink mt-10 mb-3">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-medium text-ink mt-8 mb-2">{children}</h3>
          ),
          p: ({ children }) => <p>{children}</p>,
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-accent underline underline-offset-4 hover:opacity-80"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => <ul className="list-disc pl-6 space-y-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-6 space-y-2">{children}</ol>,
          em: ({ children }) => <em className="italic">{children}</em>,
          strong: ({ children }) => <strong className="text-ink font-medium">{children}</strong>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-accent/40 pl-4 italic text-ink-muted/90">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="border-t border-ink/10 my-12" />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
