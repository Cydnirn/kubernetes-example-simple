import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiFetch } from "../api.js";

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await apiFetch(`/users/${id}`);
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  if (loading) {
    return (
      <section className="card">
        <p>Loading user...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card">
        <p className="error">{error}</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="card">
        <p>User not found.</p>
      </section>
    );
  }

  return (
    <section className="card">
      <div className="page-header">
        <h1>User {user.id}</h1>
        <Link className="button" to={`/users/${user.id}/edit`}>
          Edit User
        </Link>
      </div>
      <div className="detail">
        <div>
          <strong>Name:</strong> {user.name}
        </div>
        <div>
          <strong>Email:</strong> {user.email}
        </div>
        <div>
          <strong>Created:</strong> {new Date(user.created_at).toLocaleString()}
        </div>
        <div>
          <strong>Updated:</strong> {new Date(user.updated_at).toLocaleString()}
        </div>
      </div>
      <Link to="/users">Back to users</Link>
    </section>
  );
}
