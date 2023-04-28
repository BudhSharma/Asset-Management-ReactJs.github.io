import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import "./Asset.css";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SideBar from "../../Sidebar/SideBar";
import Header from "../Header";

function DisposedAsset() {
  const [depart, setDepart] = useState([]);

  const getDepartment = () => {
    axios
      .get("https://asset-3xk6.onrender.com/asset-data")
      .then((response) => {
        setDepart(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDepartment();
  }, []);

  return (
    <SideBar>
      <Header />
      <>
        <section style={{ marginTop: "80px" }}>
          <div className="form_data">
            <div className="form_heading sticky-top">
              <h2>
                <AutoDeleteIcon /> Disposed Asset
              </h2>
            </div>
            <div
              className="apps-container"
              style={
                {
                  // marginLeft: "-12px",
                  // marginTop: "12px",
                  // marginRight: "-260px",
                }
              }
            >
              <table className="main-table">
                <tr className="table-heading">
                  <th>Asset Id</th>
                  <th>Asset Name</th>
                  <th>Purchase Date</th>
                  <th>Desposed Date</th>
                  <th>Views</th>
                </tr>
                {depart.map((special) => {
                  var s = new Date(special.createdAt).toLocaleString(
                    undefined,
                    {
                      timeZone: "Asia/Kolkata",
                    }
                  );

                  return (
                    <tr className="table-data">
                      <td style={{ width: "10%" }}>{special.assetId}</td>
                      <td style={{ width: "20%" }}>{special.asset_type}</td>
                      <td style={{ width: "20%" }}>{special.purchased_date}</td>
                      <td style={{ width: "20%" }}>{s}</td>
                      <td style={{ width: "15%" }}>
                        <Link to={`/view-asset/${special._id}/${1}`}>
                          <button className="btn btn-outline-success">
                            {" "}
                            <VisibilityIcon />
                            View Asset
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
            <ToastContainer />
          </div>
        </section>
      </>
    </SideBar>
  );
}

export default DisposedAsset;
