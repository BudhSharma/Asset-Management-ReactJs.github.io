import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import SideBar from "../Sidebar/SideBar";
import Header from "./Header";
import TotalAssets from "./DashboardCards/TotalAssets";
import TotalValueOfAsset from "./DashboardCards/TotalValueOfAsset";
import AvailableAsset from "./DashboardCards/AvailableAsset";
import FinancialYear from "./DashboardCards/FinancialYear";
import AssignedData from "./DashboardCards/AssignedData";

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
      <div style={{ marginTop: "80px", height:"100%" }}>
        {data ? (
          <div style={{ padding: "0 20px" }}>
            <h1>User Email: {logindata ? logindata.ValidUserOne.email : ""}</h1>
            <div className="row mt-4">
              <div className="col-12">
                <h3>Assets Details</h3>
              </div>
              <div className="col-md-4">
                <TotalAssets />
              </div>
              <div className="col-md-4">
                <TotalValueOfAsset />
              </div>
              <div className="col-md-4">
                <AvailableAsset />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <h3>Financial Year</h3>
              </div>
              <div className="col-md-4">
                <FinancialYear />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <h3>Assigned Asset</h3>
              </div>
              <div className="col-md-4">
                <AssignedData />
              </div>
            </div>
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
