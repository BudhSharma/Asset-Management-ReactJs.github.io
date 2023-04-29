import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./mix.css";
import SideBar from "../Sidebar/SideBar";
import Header from "./Header";

const Register = () => {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    fname: "",
    jobTitle: "",
    phone: "",
    email: "",
    password: "",
    cpassword: "",
  });

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

  const addUserdata = async (e) => {
    e.preventDefault();

    const { fname, email, password, cpassword, jobTitle, phone } = inpval;

    if (fname === "") {
      toast.warning("Name is required!", {
        position: "top-center",
      });
    } else if (email === "") {
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
    } else if (password.length < 8) {
      toast.error("password must be 6 char!", {
        position: "top-center",
      });
    } else if (cpassword === "") {
      toast.error("cpassword is required!", {
        position: "top-center",
      });
    } else if (cpassword.length < 8) {
      toast.error("confirm password must be 6 char!", {
        position: "top-center",
      });
    } else if (password !== cpassword) {
      toast.error("pass and Cpass are not matching!", {
        position: "top-center",
      });
    } else {
      // console.log("user registration succesfully done");

      const data = await fetch("https://asset-3xk6.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          jobTitle,
          phone,
          email,
          password,
          cpassword,
        }),
      });

      const res = await data.json();
      // console.log(res.status);

      if (res.status === 201) {
        toast.success("Registration Successfully done 😃!", {
          position: "top-center",
        });
        setInpval({
          ...inpval,
          fname: "",
          jobTitle: "",
          phone: "",
          email: "",
          password: "",
          cpassword: "",
        });
      } else {
        toast.warning("Email is already exists", {
          position: "top-center",
        });
      }
    }
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://asset-3xk6.onrender.com/department")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <SideBar>
      <Header />
      <>
        <section style={{ marginTop: "80px" }}>
          <div
            className="form_data"
            style={{
              width: "45%",
              height: "660px",
              marginLeft: "245px",
              boxShadow: "rgb(0, 7, 61)",
            }}
          >
            <div className="form_heading">
              <h1>Add User</h1>
              {/* <p style={{ textAlign: "center" }}>
              We are glad that you will be using Project Cloud to manage <br />
              your tasks! We hope that you will get like it.
            </p> */}
            </div>

            <form>
              <div className="form_input">
                <label htmlFor="fname">Name</label>
                <input
                  type="text"
                  onChange={setVal}
                  value={inpval.fname}
                  name="fname"
                  id="fname"
                  placeholder="Enter Name"
                />
              </div>
              <div className="form_input">
                <label htmlFor="jobTitle">Department</label>
                <select
                  className="select form-select"
                  value={inpval.jobTitle}
                  name="jobTitle"
                  onChange={setVal}
                >
                  <option value="">Select an option</option>
                  {data.map((item) => (
                    // <input
                    //   type="text"
                    //   onChange={setVal}
                    //   value={inpval.jobTitle}
                    //   name="jobTitle"
                    //   id="jobTitle"
                    //   placeholder="Enter department"
                    // />;

                    <option key={item._id} value={item.department}>
                      {item.department}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form_input">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  onChange={setVal}
                  value={inpval.email}
                  name="email"
                  id="email"
                  placeholder="Enter Email Address"
                />
              </div>
              <div className="form_input">
                <label htmlFor="phone">Mobile Number</label>
                <input
                  type="text"
                  onChange={setVal}
                  value={inpval.phone}
                  name="phone"
                  id="phone"
                  placeholder="Enter Mobile Number"
                />
              </div>
              <div className="form_input">
                <label htmlFor="password">Password</label>
                <div className="two">
                  <input
                    type={!passShow ? "password" : "text"}
                    value={inpval.password}
                    onChange={setVal}
                    name="password"
                    id="password"
                    placeholder="Enter password"
                  />
                  <div
                    className="showpass"
                    onClick={() => setPassShow(!passShow)}
                  >
                    {!passShow ? "Show" : "Hide"}
                  </div>
                </div>
              </div>

              <div className="form_input">
                <label htmlFor="password">Confirm Password</label>
                <div className="two">
                  <input
                    type={!cpassShow ? "password" : "text"}
                    value={inpval.cpassword}
                    onChange={setVal}
                    name="cpassword"
                    id="cpassword"
                    placeholder="Confirm password"
                  />
                  <div
                    className="showpass"
                    onClick={() => setCPassShow(!cpassShow)}
                  >
                    {!cpassShow ? "Show" : "Hide"}
                  </div>
                </div>
              </div>

              <button className="btn" onClick={addUserdata}>
                Create New User
              </button>
              {/* <p>
              Already have an account? <NavLink to="/">Log In</NavLink>
            </p> */}
            </form>
            <ToastContainer />
          </div>
        </section>
      </>
    </SideBar>
  );
};

export default Register;
