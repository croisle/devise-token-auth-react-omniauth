import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { LoginContext } from "./dataflow/context/LoginContext";

import axios from "axios";

const Navbar = () => {
  const { user } = useContext(LoginContext);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (user.isLogged === true) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);

  const logout = () => {
    axios
      .delete("auth/sign_out")
      .then((response) => {
        // clean up the localstorage, update the navbar and redirect the user to the homepage
        window.localStorage.removeItem("authHeaders");
        window.localStorage.removeItem("user");
        setLoggedIn(false);
        location.replace("/");
      })
      .catch((error) => {
        console.log(error);
        window.localStorage.removeItem("authHeaders");
        window.localStorage.removeItem("user");
        setLoggedIn(false);
        location.replace("/");
      });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="logo-container">
        <Link to="/">
          <h4>Homepage</h4>
        </Link>
      </div>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav new-navbar ml-md-auto">
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <button className="btn btn-dark" onClick={logout}>
                  logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <button className="btn btn-dark">Login</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
const ImageLogo = styled.img`
  width: 100%;
`;
