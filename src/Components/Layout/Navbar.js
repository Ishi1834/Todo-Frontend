import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoggedInContext } from "../../Contexts/LoggedInContext";

export default function Navbar() {
  const { userLoggedIn } = useContext(LoggedInContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="navbar-brand">TTD</div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link data-testid="nav2" className="nav-link" to="/">
                Homepage
              </Link>
            </li>
            <li className="nav-item">
              <Link data-testid="nav2" className="nav-link" to="/loginout">
                {userLoggedIn ? "Logout" : "Login"}
              </Link>
            </li>
            <li className="nav-item">
              <Link data-testid="nav2" className="nav-link" to="/account">
                {userLoggedIn ? "Profile" : "Signup"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
