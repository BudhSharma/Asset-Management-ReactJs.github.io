import React from "react";
import SideBar from "../Sidebar/SideBar";
import Header from "./Header";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function UserList() {
  const [user, setUser] = useState([]);

  const getUSer = () => {
    axios
      .get("http://localhost:8010/user-list")
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUSer();
  }, []);

  return (
    <SideBar>
      <Header />
      <div
        className="apps-container"
        style={{ margin: "20px", marginTop: "80px" }}
      >
        <h2>List of Users</h2>
        <table className="main-table">
          <tr className="table-heading">
            <th>User Name</th>
            <th>Email</th>
            <th>Job Title</th>
            <th>Phone</th>
          </tr>
          {user.map((user) => {
            return (
              <tr>
                <td>{user.fname}</td>
                <td>{user.email}</td>
                <td>{user.jobTitle}</td>
                <td>{user.phone}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </SideBar>
  );
}

export default UserList;
