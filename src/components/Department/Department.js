import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dpt.css";
import { ToastContainer, toast } from "react-toastify";
import SideBar from "../../Sidebar/SideBar";
import Header from "../Header";

function Department() {
  const [show, setShow] = useState(false);
  const [names, setNames] = useState([]);
  const [department, setDepartment] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");

  const clickShow = () => {
    setShow(true);
  };
  useEffect(() => {
    getNames();
  }, []);

  const getNames = () => {
    axios
      .get("https://asset-3xk6.onrender.com/department")
      .then((response) => {
        setNames(response.data);
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addName = () => {
    axios
      .post("https://asset-3xk6.onrender.com/department", { department })
      .then((response) => {
        setNames([...names, response.data]);
        setDepartment("");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 409) {
          toast.warning("Department is already exists", {
            position: "top-center",
          });
        }
      });
  };

  const updateName = () => {
    axios
      .patch(`https://asset-3xk6.onrender.com/department/${editId}`, { department })
      .then((response) => {
        const updatedNames = names.map((name) => {
          if (name._id === response.data._id) {
            return response.data;
          }
          return name;
        });
        setNames(updatedNames);
        setDepartment("");
        setEditId("");
        setEditMode(false);
        getNames();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteName = (id) => {
    axios
      .delete(`https://asset-3xk6.onrender.com/department/${id}`)
      .then((response) => {
        const filteredNames = names.filter((name) => name._id !== id);
        setNames(filteredNames);
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
    setDepartment(name);
  };

  return (
    <SideBar>
      <Header />
      <div
        className="apps-container"
        style={{ margin: "20px", marginTop: "80px" }}
      >
        <h2>Add New Department</h2>
        {show ? (
          <div>
            <form onSubmit={handleSubmit}>
              <input
                required="required"
                className="add-department"
                type="text"
                value={department}
                placeholder="Add new Department..."
                onChange={(e) => setDepartment(e.target.value)}
              />
              <button type="submit" class="add-btn btn btn-success">
                {editMode ? (
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
                    Click to Add
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
          </div>
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
            <th>Department</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {/* <tr> */}
          {names.map((name) => (
            <tr className="table-data">
              <td style={{ width: "80%" }}>{name.department}</td>

              <td>
                <button
                  class="edit-btn btn btn-outline-success"
                  onClick={() => handleEdit(name._id, name.department)}
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

              <td>
                <button
                  class="delete-btn btn btn-outline-danger"
                  onClick={() => deleteName(name._id)}
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
            </tr>
          ))}
          {/* </tr> */}
        </table>
      </div>
    </SideBar>
  );
}

export default Department;
