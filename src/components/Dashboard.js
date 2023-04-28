import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import SideBar from "../Sidebar/SideBar";
import Header from "./Header";

const Dashboard = () => {
  const { logindata, setLoginData } = useContext(LoginContext);

  const [data, setData] = useState(false);

  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("https://asset-3xk6.onrender.com/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();

    if (data.status == 401 || !data) {
      history("*");
    } else {
      setLoginData(data);
      history("/dash");
    }
  };

  useEffect(() => {
    // setTimeout(() => {
    DashboardValid();
    setData(true);
    // }, 2000);
  }, []);

  return (
    <SideBar>
      <Header />
      <div style={{ marginTop: "80px" }}>
        {data ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="./man.png"
              style={{ width: "200px", marginTop: 20 }}
              alt=""
            />
            <h1>User Email: {logindata ? logindata.ValidUserOne.email : ""}</h1>
          </div>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            Loading... &nbsp;
            <CircularProgress />
          </Box>
        )}
      </div>
    </SideBar>
  );
};

export default Dashboard;
