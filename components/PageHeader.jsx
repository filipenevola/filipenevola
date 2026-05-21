export function PageHeader({ title, description, children }) {
  return (
    <header className="mb-8">
      <h1 className="text-2xl font-semibold text-white md:text-3xl">{title}</h1>
      {description && (
        <p className="mt-2 max-w-2xl text-palmeiras-muted">{description}</p>
      )}
      {children && <div className="mt-4">{children}</div>}
    </header>
  );
}
