import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const [birdName, setBirdName] = useState("");
  const history = useHistory();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (birdName.trim() !== "") {
      history.push(
        `/search-by-name/sightings?birdName=${encodeURIComponent(
          birdName.trim()
        )}`
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/birds">
              Birds
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/birds/save">
              Add Bird
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/sightings">
              Sightings
            </NavLink>
          </li>
          <li className="nav-item">
            <form className="d-flex" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="form-control me-2"
                placeholder="Search Bird by Name"
                value={birdName}
                onChange={(e) => setBirdName(e.target.value)}
              />
              <button className="btn btn-outline-light" type="submit">
                Search
              </button>
            </form>
          </li>
        </ul>
      </div>
    </nav>
  );
};
