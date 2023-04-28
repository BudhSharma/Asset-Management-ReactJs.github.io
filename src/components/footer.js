import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./mix.css";
import "./login.css";
import logo from "../assets/images/zaperon_logo.png";

function Footer(props) {
  return (
    <div className="footer d-flex flex-column align-items-center flex-md-row justify-content-around">
      <div className="logo mt-3 mt-md-0">
        <p>Powered by</p>
        <img src={logo} alt="logo" />
      </div>

      <div className="f-links mt-2 mt-md-0">
        <a href="/">Need help?</a>
        <a href="/">
          Privacy <span>&</span> Terms
        </a>
      </div>
    </div>
  );
}

export default Footer;
