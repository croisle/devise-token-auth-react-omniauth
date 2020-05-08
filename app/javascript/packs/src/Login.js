import React, { useContext, useState, Component } from "react";

import { Link, Redirect, useHistory } from "react-router-dom";
import { LoginContext } from "./dataflow/context/LoginContext";

import styled from "styled-components";
import axios from "axios";
function Login(props) {
  const { user, dispatch } = useContext(LoginContext);

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const referer = props.location.state || "/";
  const history = useHistory();
  const Url = {
    login: "auth/sign_in",
  };


  

  // const facebookLoginUrl = `http://localhost:3000/omniauth/facebook`;
// 
  const facebookLoginUrl = `http://localhost:3000/api/v1/auth/facebook`;
  const googleLoginUrl = `http://localhost:3000/api/v1/auth/google_oauth2`;

  function postLogin(e) {
    e.preventDefault();
    var credentials = { email: userEmail, password: password };

    axios
      .post(Url.login, credentials)
      .then((response) => {
        console.log("res login");
        console.log(response);

        // change the state of the login reducer via the IS_LOGGED action
        dispatch({
          type: "IS_LOGGED",
          user: {
            isLogged: true,
            id: response.data.data.id,
          },
        });
        // redirect the admin to the admin page
        history.push("/dashboard");
      })
      .catch((e) => {
        setIsError(true);
      });
  }

  const connectToFacebook = () => {
    axios
      .get(facebookLoginUrl)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const facebookPostRequest = () => {
    axios
      .post(facebookLoginUrl)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const connectToGoogle = () => {
    axios
      .get(googleLoginUrl)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <LoginFormContainer className="register-form col-8">
          <div>
            <h1>Login</h1>
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value.trim());
                }}
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value.trim());
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-block btn-dark"
              onClick={postLogin}
            >
              Submit
            </button>
          </form>
          <a
            className="btn btn-block btn-primary
            "
            href={facebookLoginUrl}
          >
            Connect with Facebook (href)
          </a>
          <div
            className="btn btn-block btn-primary"
            onClick={connectToFacebook}
          >
            <h5> Connect with Facebook via Axios (get request)</h5>
          </div>

          <div className="btn btn-block btn-info" onClick={facebookPostRequest}>
            <h5> Connect with Facebook via Axios (post request)</h5>
          </div>
          <a
            className="btn btn-block btn-danger
            "
            href={googleLoginUrl}
          >
            Connect with Google (href)
          </a>
          <div className="btn btn-block btn-danger" onClick={connectToGoogle}>
            <h5> Connect with Google via Axios (get request)</h5>
          </div>
        </LoginFormContainer>
      </div>
    </div>
  );
}

export default Login;

const LoginFormContainer = styled.div`
  margin: auto;
  height: 100vh;
`;
