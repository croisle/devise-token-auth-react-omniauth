import React, { useEffect, useState, useContext } from "react";
import { LoginContext } from "./LoginContext";
import axios from "axios";
import { config } from "./Constants";

// This component will take care of changing the value of the headers depending
// on the request and the status of the user with the server response
function Interceptor() {
  const { user, dispatch } = useContext(LoginContext);

  axios.defaults.baseURL = config.url.API_URL;
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Accept"] = "application/json";

  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  axios.interceptors.request.use(
    async (config) => {
      console.log(config);
      
      const authHeaders = JSON.parse(
        window.localStorage.getItem("authHeaders")
      );
      if (authHeaders) {
        config.headers[config.method] = {
          "access-token": authHeaders["access-token"],
          client: authHeaders["client"],
          uid: authHeaders["uid"],
        };
      }
      return config;
    },
    async (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    async (response) => {
      console.log(response);
      
      if (response.data.status === "unauthorized") {
        dispatch({ type: "AUTHORIZATION", user: { authorized: false } });
        // location.replace('/')
      }
      if (response.status === 422) {
        console.log(response);
      }

      if (response.headers["access-token"]) {
        const authHeaders = {
          "access-token": response.headers["access-token"],
          client: response.headers["client"],
          uid: response.headers["uid"],
          expiry: response.headers["expiry"],
          "token-type": response.headers["token-type"],
        };
        window.localStorage.setItem("authHeaders", JSON.stringify(authHeaders));
        dispatch({ type: "AUTHORIZATION", user: { authorized: true } });
      }

      return response;
    },
    async (error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        dispatch({ type: "AUTHORIZATION", user: { authorized: false } });
        // location.replace('/')
      }
      if (error.response.status === 422) {
        console.log(error.response);
      }
      if (error.response.status === 404) {
        console.log(error.response);
        location.replace("/");
      }
      console.log(error);
      // location.replace('/')
      return Promise.reject(error);
    }
  );
  return <React.Fragment />;
}

export default Interceptor;
