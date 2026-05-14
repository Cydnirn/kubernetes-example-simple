import { NavLink } from "react-router-dom";

export default function Nav() {
  const linkClass = ({ isActive }) => (isActive ? "active" : undefined);
  const buttonClass = ({ isActive }) =>
    isActive ? "button-link active" : "button-link";

  return (
    <nav className="nav">
      <div className="nav-brand">User Management</div>
      <div className="nav-links">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/users" className={linkClass}>
          Users
        </NavLink>
        <NavLink to="/users/new" className={buttonClass}>
          Add User
        </NavLink>
      </div>
    </nav>
  );
}
