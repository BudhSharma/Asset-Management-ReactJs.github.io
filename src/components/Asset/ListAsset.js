import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LoginContext } from "../ContextProvider/Context";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../../Sidebar/SideBar";
import Header from "../Header";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

function ListAsset() {
  const [show, setShow] = useState(false);
  const [names, setNames] = useState([]);
  const [category, setCategory] = useState("");
  const [disposed, setDisposed] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const [save, setSave] = useState();
  const navigate = useNavigate();
  const [status, setStatus] = useState("-1");

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
        let data = response.data;
        // statusButtons.forEach((b) => {
        //   data.forEach((d) => {
        //     if (d.status == b.status) {
        //       d["statusName"] = b.name;
        //     } else {
        //       d["statusName"] = "Status";
        //     }
        //   });
        // });
        setNames(data);
        console.log(data)
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
  const statusButtons = [
    {
      status: "1",
      name: "Under Repair",
    },
    {
      status: "2",
      name: "Lost",
    },
    {
      status:'0',
      name:"CheckedOut"
    }
  ];
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
  const changeAssetsStatus = (status, id) => {
    axios
      .patch(`https://asset-3xk6.onrender.com/asset/${id}`, { status })
      .then((res) => {
        console.log(res)
        // names.forEach(element => {
        //   if(element._id == res.data._id){
        //     element = res.data
        //   }
        // });
        const d = names.map((n) => {
          let obj = n
          if(obj._id == id){
            obj.status = status
          }
          return obj
        })
        setNames(d);
        // getNames()
      })
      .catch((err) => console.log(err));
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
        style={{ margin: "20px", marginTop: "80px" }}
      >
        <h2>List of Asset</h2>
        <table className="main-table">
          <tr className="table-heading">
            <th>Brand name</th>
            <th>Name of Asset</th>
            <th>Assigned Asset</th>
            <th>Created by</th>
            <th>Date</th>
            <th>View Asset</th>
            <th>Status</th>
            <th>Disposed</th>
          </tr>
          {names.map((name) => {
            return (
              <tr>
                <td style={{ width: "10%" }}>{name.brand}</td>
                <td style={{ width: "10%" }}>{name.asset_type}</td>
                <td style={{ width: "15%" }}>
                  {name.employee_name == -1 ? (
                    <b style={{ color: "red" }}>not-assinged</b>
                  ) : (
                    <span style={{ color: "blue" }}>{name.employee_name}</span>
                  )}
                </td>
                {names.length > 0 && <td style={{ width: "15%" }}>{fn}</td>}
                <td style={{ width: "10%" }}>{name.createdAt.split("T")[0]}</td>

                <td style={{ width: "12%" }}>
                  <Link to={`/view-asset/${name._id}/${0}`}>
                    <button className="btn btn-success">
                      {" "}
                      <VisibilityIcon />
                      View Asset
                    </button>
                  </Link>
                </td>
                <td style={{ width: "13%" }}>
                  <Popup
                    trigger={
                      <button className="btn btn-warning" type="button">
                        {/* {status !== "-1" ? (
                          <>
                            <MilitaryTechIcon />
                            {status}
                          </>
                        ) : (
                          <>
                            <MilitaryTechIcon />
                            {name.statusName}
                          </>
                        )} */}
                        <MilitaryTechIcon/>
                        {statusButtons?.filter(b => b.status == name.status)[0]?.name}
                      </button>
                    }
                    position="right center"
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <div style={{ fontWeight: "bold", color: "red" }}>
                          Change asset status
                        </div>
                      </div>
                      {statusButtons.map((btn) => {
                        return (
                          <div className="col-md-12">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              style={{ width: "80%" }}
                              onClick={() =>
                                changeAssetsStatus(btn.status, name._id)
                              }
                            >
                              {btn.name}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </Popup>
                </td>
                <td style={{ width: "15%" }}>
                  {/* <Link to={`https://asset-3xk6.onrender.com/asset-data/${name._id}`}> */}
                  {name.disposed ? (
                    <b style={{ fontSize: "large", color: "red" }}>
                      Already Disposed
                    </b>
                  ) : (
                    <button
                      className="btn btn-danger"
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
