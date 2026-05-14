import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../api.js";

export default function UserForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = mode === "edit";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) {
      return;
    }

    const loadUser = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await apiFetch(`/users/${id}`);
        setName(data.name);
        setEmail(data.email);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, isEdit]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      if (isEdit) {
        await apiFetch(`/users/${id}`, {
          method: "PUT",
          body: JSON.stringify({ name, email }),
        });
      } else {
        await apiFetch("/users", {
          method: "POST",
          body: JSON.stringify({ name, email }),
        });
      }
      navigate("/users");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="card">
      <h1>{isEdit ? "Edit User" : "Add User"}</h1>
      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading user...</p>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <div className="form-actions">
            <button className="button" type="submit">
              {isEdit ? "Save Changes" : "Create User"}
            </button>
            <button
              className="button secondary"
              type="button"
              onClick={() => navigate("/users")}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
