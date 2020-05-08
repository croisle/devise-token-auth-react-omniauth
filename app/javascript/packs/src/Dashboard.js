import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [currentUser, setcurrentUser] = useState({});

  useEffect(() => {
    axios
      .get("infos")
      .then((response) => {
        setcurrentUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <h3>Email: {currentUser.email}</h3>
      <h3>ID: {currentUser.id}</h3>
      <h3>Provider: {currentUser.provider}</h3>
    </div>
  );
};

export default Dashboard;
