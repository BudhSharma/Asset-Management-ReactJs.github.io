import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import SideBar from "../../Sidebar/SideBar";
import Header from "../Header";
import Modal from "../Modal";
import { Box, CircularProgress } from "@mui/material";

function Employee() {
  const [names, setNames] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [site, setSite] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const [cmp, setCmp] = useState([]);
  const [depart, setDepart] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const clickShow = () => {
    setShow(true);
  };

  const getDepartment = () => {
    axios
      .get("https://asset-3xk6.onrender.com/department")
      .then((response) => {
        setDepart(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCompany = () => {
    axios
      .get("https://asset-3xk6.onrender.com/company")
      .then((response) => {
        setCmp(response.data);
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getDepartment();
    getCompany();
    getNames();
  }, []);

  const getNames = () => {
    axios
      .get("https://asset-3xk6.onrender.com/employee")
      .then((response) => {
        setNames(response.data);
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addName = () => {
    setLoading(true);
    axios
      .post("https://asset-3xk6.onrender.com/employee", {
        name,
        email,
        site,
        location,
        department,
      })
      .then((response) => {
        setNames([...names, response.data]);
        setName("");
        setEmail("");
        setSite("");
        setLocation("");
        setDepartment("");
        setLoading(false);
        if (response.status === 201) {
          toast.success("Employee is created", {
            position: "top-center",
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          toast.warning("Employee email is already exists", {
            position: "top-center",
          });
        }
      });
  };

  const updateName = () => {
    setLoading(true);
    axios
      .patch(`https://asset-3xk6.onrender.com/employee/${editId}`, {
        name,
        email,
        site,
        location,
        department,
      })
      .then((response) => {
        const updatedNames = names.map((nam) => {
          if (nam._id === response.data._id) {
            return response.data;
          }
          return nam;
        });
        setNames(updatedNames);
        setName("");
        setEmail("");
        setSite("");
        setLocation("");
        setDepartment("");
        setEditId("");
        setEditMode(false);
        getNames();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteName = (id) => {
    axios
      .delete(`https://asset-3xk6.onrender.com/employee/${id}`)
      .then((response) => {
        const filteredNames = names.filter((name) => name._id !== id);
        setNames(filteredNames);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [modalOpen, setModalOpen] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editMode) {
      addName();
    } else {
      updateName();
    }
  };

  const handleEdit = (id, name, email, site, location, department) => {
    clickShow();
    setEditMode(true);
    setEditId(id);
    setName(name);
    setEmail(email);
    setSite(site);
    setLocation(location);
    setDepartment(department);
  };

  return (
    <SideBar>
      <Header />
      <div
        className="apps-container"
        style={{ margin: "15px", marginTop: "80px" }}
      >
        <h2>Add New Employee</h2>
        {show ? (
          <>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form_input" style={{ marginBottom: "5px" }}>
                    <input
                      required="required"
                      className="add-department"
                      type="text"
                      value={name}
                      placeholder="Add new name..."
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form_input" style={{ marginBottom: "12px" }}>
                    <input
                      required="required"
                      className="add-department"
                      type="text"
                      value={email}
                      placeholder="Add new email..."
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {/* <input
          required="required"
          className="add-department"
          type="text"
          value={site}
          placeholder="Add new company..."
          onChange={(e) => setSite(e.target.value)}
        /> */}
                  <div className="form_input">
                    <select
                      required="required"
                      className="select form-select"
                      value={site}
                      name="jobTitle"
                      onChange={(e) => setSite(e.target.value)}
                      style={{
                        width: "337px",
                        borderWidth: "2px",
                        borderColor: "black",
                      }}
                    >
                      <option value="">Select company</option>
                      {cmp.map((item) => (
                        <option key={item._id} value={item.company}>
                          {item.company}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form_input" style={{ marginBottom: "12px" }}>
                    <input
                      required="required"
                      className="add-department"
                      type="text"
                      value={location}
                      placeholder="Add new location..."
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  {/* <input
          required="required"
          className="add-department"
          type="text"
          value={department}
          placeholder="Add new Department..."
          onChange={(e) => setDepartment(e.target.value)}
        /> */}

                  <select
                    required="required"
                    className="select form-select"
                    value={department}
                    name="jobTitle"
                    onChange={(e) => setDepartment(e.target.value)}
                    style={{
                      width: "337px",
                      borderWidth: "2px",
                      borderColor: "black",
                    }}
                  >
                    <option value="">Select department</option>
                    {depart.map((item) => (
                      <option key={item._id} value={item.department}>
                        {item.department}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                class="add-btn btn btn-success"
                disabled={loading}
              >
                {editMode ? (
                  <>
                    {loading ? (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Loading... &nbsp;
                        <CircularProgress />
                      </Box>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pencil-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                        </svg>
                        Update
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {loading ? (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Loading... &nbsp;
                        <CircularProgress />
                      </Box>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18x"
                          fill="currentColor"
                          class="bi bi-plus-lg"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                          />
                        </svg>
                        Click to add
                      </>
                    )}
                  </>
                )}
              </button>
              <button
                type="submit"
                class="add-btn btn btn-success"
                onClick={() => setShow(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18x"
                  fill="currentColor"
                  class="bi bi-plus-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                  />
                </svg>
                Close
              </button>
            </form>
            <ToastContainer />
          </>
        ) : (
          <button
            type="submit"
            class="add-btn btn btn-success"
            onClick={clickShow}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18x"
              fill="currentColor"
              class="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
            Add new Department
          </button>
        )}
        <table className="main-table">
          <tr className="table-heading">
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Location</th>
            <th>Department</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {/* <tr> */}
          {names.map((special) => (
            <tr className="table-data">
              <td style={{ width: "20%" }}>{special.name}</td>
              <td style={{ width: "20%" }}>{special.email}</td>
              <td style={{ width: "20%" }}>{special.site}</td>
              <td style={{ width: "10%" }}>{special.location}</td>
              <td style={{ width: "20%" }}>{special.department}</td>

              <td style={{ width: "5%" }}>
                <button
                  class="edit-btn btn btn-outline-success"
                  onClick={() =>
                    handleEdit(
                      special._id,
                      special.name,
                      special.email,
                      special.site,
                      special.location,
                      special.department
                    )
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                  </svg>
                  Edit
                </button>
              </td>

              <td style={{ width: "5%" }}>
                <button
                  class="delete-btn btn btn-outline-danger"
                  // onClick={() => deleteName(special._id)}
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                  </svg>
                  Delete
                </button>
              </td>
              {modalOpen && (
                <Modal
                  setOpenModal={setModalOpen}
                  id={special._id}
                  setNames={setNames}
                  names={names}
                  no={1}
                />
              )}
            </tr>
          ))}
          {/* </tr> */}
        </table>
      </div>
    </SideBar>
  );
}

export default Employee;
