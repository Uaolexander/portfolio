export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <p className="font-mono text-[11px] text-text-low uppercase tracking-widest mb-4">
        404
      </p>
      <p className="text-[15px] text-text-dim">
        Page not found.{' '}
        <a
          href="/en"
          className="text-text underline underline-offset-2 hover:text-text-dim transition-colors"
        >
          Go home
        </a>
      </p>
    </div>
  );
}
