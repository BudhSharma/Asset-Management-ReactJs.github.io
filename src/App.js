import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Category from "./components/Category/Category";
import Company from "./components/Company/Company";
import Employee from "./components/Employee/Employee";
import AddAsset from "./components/Asset/AddAsset";
import ListAsset from "./components/Asset/ListAsset";
import ViewAsset from "./components/Asset/ViewAsset";
import EditAsset from "./components/Asset/EditAsset";
import DisposedAsset from "./components/Asset/DisposedAsset";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import PasswordReset from "./components/PasswordReset";
import ForgotPassword from "./components/ForgotPassword";
import Department from "./components/Department/Department";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import React from "react";
import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./components/ContextProvider/Context";
import Header from "./components/Header";
import UserList from "./components/UserList";
import LabTabs from "./components/Feed/DashboardTab";

function App() {
  const [data, setData] = useState(false);
  const { logindata, setLoginData } = useContext(LoginContext);

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

    if (data.status === 401 || !data) {
      console.log("");
    } else {
      setLoginData(data);
      // history("/dash");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 2000);
  }, []);

  return (
    <div className="App">
      {data ? (
        <>
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/department" element={<Department />} />
            <Route path="/category" element={<Category />} />
            <Route path="/company" element={<Company />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/dash" element={<Dashboard />} />
            <Route path="/add-asset" element={<AddAsset />} />
            <Route path="/list-asset" element={<ListAsset />} />
            <Route path="/view-asset/:id/:no" element={<ViewAsset />} />
            <Route path="/edit-asset/:id" element={<EditAsset />} />
            <Route path="/disposed-asset" element={<DisposedAsset />} />
            <Route path="/feed" element={<LabTabs />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route
              path="/forgotpassword/:id/:token"
              element={<ForgotPassword />}
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </>
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
  );
}

export default App;
