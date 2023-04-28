import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LoginContext } from "../ContextProvider/Context";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../../Sidebar/SideBar";
import Header from "../Header";

function ListAsset() {
  const [show, setShow] = useState(false);
  const [names, setNames] = useState([]);
  const [category, setCategory] = useState("");
  const [disposed, setDisposed] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const [save, setSave] = useState();
  const navigate = useNavigate();

  const clickShow = () => {
    setShow(true);
  };

  useEffect(() => {
    getNames();
  }, []);

  const getNames = () => {
    axios
      .get("https://asset-3xk6.onrender.com/asset")
      .then((response) => {
        setNames(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addName = () => {
    axios
      .post("https://asset-3xk6.onrender.com/asset", { category })
      .then((response) => {
        setNames([...names, response.data]);
        setCategory("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateName = () => {
    axios
      .patch(`https://asset-3xk6.onrender.com/asset/${editId}`, { category })
      .then((response) => {
        const updatedNames = names.map((name) => {
          if (name._id === response.data._id) {
            return response.data;
          }
          return name;
        });
        setNames(updatedNames);
        setCategory("");
        setEditId("");
        setEditMode(false);
        getNames();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onDisposeClick = (id) => {
    axios
      .delete(`https://asset-3xk6.onrender.com/asset-data/${id}`)
      .then((response) => {
        setSave(response);
        getNames();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editMode) {
      addName();
    } else {
      updateName();
    }
  };

  const handleEdit = (id, name) => {
    clickShow();
    setEditMode(true);
    setEditId(id);
    setCategory(name);
  };

  const { logindata, setLoginData } = useContext(LoginContext);
  const [fn, setFn] = useState();

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
      setFn(data.ValidUserOne.fname);
      // history("/dash");
    }
  };

  useEffect(() => {
    // setTimeout(() => {
    DashboardValid();
    // }, 2000);
  }, []);

  return (
    <SideBar>
      <Header />
      <div
        className="apps-container"
        style={{ margin:"20px", marginTop:"80px" }}
      >
        <h2>List of Asset</h2>
        <table className="main-table">
          <tr className="table-heading">
            <th>Brand name</th>
            <th>Name of Asset</th>
            <th>Created by</th>
            <th>Date</th>
            <th>View Asset</th>
            <th>Disposed</th>
          </tr>
          {names.map((name) => {
            return (
              <tr>
                <td style={{ width: "20%" }}>{name.brand}</td>
                <td style={{ width: "15%" }}>{name.asset_type}</td>
                {names.length > 0 && <td style={{ width: "20%" }}>{fn}</td>}
                <td style={{ width: "15%" }}>{name.createdAt.split("T")[0]}</td>

                <td style={{ width: "15%" }}>
                  <Link to={`/view-asset/${name._id}/${0}`}>
                    <button className="btn btn-outline-success">
                      {" "}
                      <VisibilityIcon />
                      View Asset
                    </button>
                  </Link>
                </td>
                <td style={{ width: "15%" }}>
                  {/* <Link to={`http://localhost:8010/asset-data/${name._id}`}> */}
                  {name.disposed ? (
                    <b style={{ fontSize: "large", color: "red" }}>
                      Already Disposed
                    </b>
                  ) : (
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => onDisposeClick(name._id)}
                    >
                      {" "}
                      <AutoDeleteIcon />
                      Dispose Asset
                    </button>
                  )}

                  {/* </Link> */}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </SideBar>
  );
}

export default ListAsset;
