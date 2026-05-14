export default function Home() {
  return (
    <section className="card">
      <h1>Welcome</h1>
      <p>
        This is a simple user management application backed by an Express API and
        PostgreSQL running in Kubernetes.
      </p>
      <p>Use the navigation above to view users or add a new user.</p>
    </section>
  );
}
