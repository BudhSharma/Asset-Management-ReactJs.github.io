import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./mix.css";
import user_icon from "../assets/images/ic_user.svg";
import eyeball_hide from "../assets/images/ic_hide_password.svg";
import eyeball_unhide from "../assets/images/ic_unhide_password.svg";
import "./login.css";
import TextField from "@mui/material/TextField";
import Footer from "./footer";

const Login = () => {
  const [passShow, setPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const history = useNavigate();

  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const loginuser = async (e) => {
    e.preventDefault();

    const { email, password } = inpval;

    if (email === "") {
      toast.error("email is required!", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.warning("includes @ in your email!", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("password is required!", {
        position: "top-center",
      });
    } else if (password.length < 6) {
      toast.error("password must be 6 char!", {
        position: "top-center",
      });
    } else {
      // console.log("user login succesfully done");

      const data = await fetch("https://asset-3xk6.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const res = await data.json();
      //  console.log(res);

      if (res.status === 201) {
        localStorage.setItem("usersdatatoken", res.result.token);
        history("/dash");
        setInpval({ ...inpval, email: "", password: "" });
      } else {
        toast.error("Invalid Credentials", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <>
      <section>
        <div
          className="form_data"
          style={{
            width: "600px",
            marginLeft: "450px",
            height: "625px",
            marginTop: "75px",
          }}
        >
          <div className="form_heading">
            {/* <h1>Welcome Back, Log In</h1> */}

            <div className="profile">
              <img src={user_icon} />
            </div>

            <h1 className="heading mt-3">Welcome!</h1>
            <p className="text-center">
              Let's connect to your workspace. <br /> Please enter your email to
              continue.
            </p>
          </div>

          <form>
            <div className="form_group">
              {/* <label htmlFor="email">Email</label>
                            <input type="email" value={inpval.email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' /> */}

              <TextField
                id="email"
                type="email"
                label="Email Address"
                variant="outlined"
                value={inpval.email}
                onChange={setVal}
                name="email"
              />
            </div>
            <div className="form_group mt-3 password-box">
              {/* <label htmlFor="password">Password</label> */}

              {/* <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name="password" id="password" placeholder='Enter Your password' /> */}

              <TextField
                id="password"
                type={!passShow ? "password" : "text"}
                label="Password"
                variant="outlined"
                value={inpval.password}
                onChange={setVal}
                name="password"
              />

              <div className="showpass" onClick={() => setPassShow(!passShow)}>
                {!passShow ? (
                  <img src={eyeball_unhide} />
                ) : (
                  <img src={eyeball_hide} />
                )}
              </div>
            </div>

            {/* <div className="form_group d-flex justify-content-end mt-3">
              <a href="/" className="forgot-pass">
                Forgot Password?
              </a>
            </div> */}

            <button className="btn" onClick={loginuser}>
              Sign In
            </button>
          </form>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default Login;
