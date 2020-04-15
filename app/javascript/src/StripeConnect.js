import React from "react";
import StripeButton from "../src/images/stripe_button.png";
import axios from "axios";

const StripeConnect = () => {


  var stripeUrlFromTheDocumentation = `https://connect.stripe.com/express/oauth/authorize?client_id=ca_32D88BD1qLklliziD7gYQvctJIhWBSQ7`;


  var stripeConnectOmniauth =`http://localhost:3000/users/omniauth/stripe_connect`

  const handleStripConnect = () => {
    axios
      .post(stripeUrlFromTheDocumentation)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <img
        src={StripeButton}
        className="stripe-connect"
        alt="stripe-connec button"
        onClick={handleStripConnect}
      />

      <li className="nav-item">
          <a href={stripeConnectOmniauth} className="btn btn-primary" alt="connect to stripe"> connect your account</a>
          </li>
    </div>
  );
};

export default StripeConnect;
