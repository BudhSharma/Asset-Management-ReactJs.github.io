import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { LoginContext } from "../ContextProvider/Context";
import SideBar from "../../Sidebar/SideBar";
import Header from "../Header";
import { useRef } from "react";

function ViewAsset() {
  const { id, no } = useParams();
  const [hit_no, setHit_no] = useState(no);
  const [names, setNames] = useState([]);

  var s = new Date(names.createdAt).toLocaleString(undefined, {
    timeZone: "Asia/Kolkata",
  });

  useEffect(() => {
    getNames();
  }, []);

  const getNames = () => {
    if (hit_no == 0) {
      axios
        .get(`https://asset-3xk6.onrender.com/asset/${id}`)
        .then((response) => {
          setNames(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (no == 1) {
      axios
        .get(`https://asset-3xk6.onrender.com/asset-data/${id}`)
        .then((response) => {
          setNames(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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

  const printRef = useRef(null);

  const handlePrint = () => {
    const content = printRef.current;
    const pri = document.createElement("div");
    pri.appendChild(content.cloneNode(true));
    const printWindow = window.open("", "printWindow", "height=400,width=800");
    printWindow.document.write(
      "<html><head><title>Selected Element Print</title>"
    );
    printWindow.document.write("</head><body>");
    printWindow.document.write(pri.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <SideBar>
      <Header />
      <div
        id="print-content"
        ref={printRef}
        style={{ margin: "40px", marginRight: "170px", marginLeft: "110px" }}
      >
        <div
          style={{
            marginTop: "115px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Website development</h3>
            <div style={{ display: "flex" }}>
              <button
                className="print-btn btn btn-outline-warning"
                onClick={handlePrint}
                style={{ marginRight: "120px" }}
              >
                <LocalPrintshopIcon />
                Print
              </button>
              {no == 0 ? (
                <Link to={`/edit-asset/${id}`} style={{ marginRight: "120px" }}>
                  <button className="edit-btn btn btn-outline-success">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                    </svg>
                    Edit
                  </button>
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="">
            <div className="row" style={{ width: "118%" }}>
              <div
                className="col-12 col-sm-8 col-md-6 col-lg-4"
                style={{ width: "300px" }}
              >
                <div className="card" style={{ width: "250px" }}>
                  <img
                    style={{
                      height: "250px",
                      width: "250px",
                      border: "1px solid #80808099",
                    }}
                    className="card-img"
                    src={
                      no == 0
                        ? `https://asset-3xk6.onrender.com/asset-brand/${id}`
                        : `https://asset-3xk6.onrender.com/asset-brand-data/${id}`
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                <div className="card">
                  <div className="text-black d-flex flex-column justify-content-center">
                    <table>
                      <tr>
                        <td>Asset Tag ID</td>
                        <td className="row-data">{names.assetId}</td>
                      </tr>
                      <tr>
                        <td>Purchase Date</td>
                        <td className="row-data">{names.purchased_date}</td>
                      </tr>
                      <tr>
                        <td>Cost</td>
                        <td className="row-data">{names.cost}</td>
                      </tr>
                      <tr>
                        <td>Brand</td>
                        <td className="row-data">{names.brand}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                <div className="card">
                  <div className="text-black d-flex flex-column justify-content-center">
                    <table>
                      <tr>
                        <td>Organization</td>
                        <td className="row-data" style={{ color: "blue" }}>
                          {names.organization}
                        </td>
                      </tr>
                      <tr>
                        <td>Location</td>
                        <td className="row-data">{names.location}</td>
                      </tr>
                      <tr>
                        <td>Category</td>
                        <td className="row-data">{names.asset_type}</td>
                      </tr>
                      <tr>
                        <td>Department</td>
                        <td className="row-data">{names.department}</td>
                      </tr>
                      <tr>
                        <td>Assigned to</td>
                        <td className="row-data" style={{ color: "blue" }}>
                          {names.employee_name}
                        </td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td
                          className="row-data"
                          style={{ backgroundColor: "#00800099" }}
                        >
                          Checked out
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Asset Details */}
        {/* Miscellaneous */}

        {names.asset_type === "laptop" ? (
          <>
            <div style={{ marginTop: "35px", marginLeft: "7px" }}>
              <h3>Asset Details</h3>
              <div className="container">
                <div
                  className="row"
                  style={{ width: "1168px", marginLeft: "-24px" }}
                >
                  <he
                    className="col-12 col-sm-8 col-md-6 col-lg-4"
                    style={{ width: "300px" }}
                  >
                    Miscellaneous
                  </he>
                  <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="card">
                      <div className="text-black d-flex flex-column justify-content-center">
                        <table>
                          <tr>
                            <td>Serial No.</td>
                            <td className="row-data">{names.serial_no}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="card">
                      <div className="text-black d-flex flex-column justify-content-center">
                        <table>
                          <tr>
                            <td>Purchased From</td>
                            <td className="row-data">{names.purchased_from}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Fields */}

            <div style={{ marginTop: "55px", marginLeft: "325px" }}>
              <div className="container">
                <div
                  className="row"
                  style={{ width: "178%", marginLeft: "-52%" }}
                >
                  <h3
                    className="col-12 col-sm-8 col-md-6 col-lg-4"
                    style={{ width: "300px" }}
                  >
                    Custom Fields
                  </h3>
                  <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="card">
                      <div className="text-black d-flex flex-column justify-content-center">
                        <table>
                          <tr>
                            <td>Ram</td>
                            <td className="row-data">{names.ram}</td>
                          </tr>
                          <tr>
                            <td>Processor</td>
                            <td className="row-data">{names.processor}</td>
                          </tr>
                          <tr>
                            <td>Hard Disk</td>
                            <td className="row-data">{names.hard_disk}</td>
                          </tr>
                          <tr>
                            <td>OS Version</td>
                            <td className="row-data">{names.os_version}</td>
                          </tr>
                          <tr>
                            <td>Owner</td>
                            <td className="row-data">{names.owner}</td>
                          </tr>
                          <tr>
                            <td>Charger</td>
                            <td className="row-data">{names.charger}</td>
                          </tr>
                          <tr>
                            <td>Keyboard</td>
                            <td className="row-data">{names.keyboard}</td>
                          </tr>
                          <tr>
                            <td>Mouse Brand</td>
                            <td className="row-data">{names.mouse_brand}</td>
                          </tr>
                          <tr>
                            <td>Ram Slot 1</td>
                            <td className="row-data">{names.ram_slot1}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="card">
                      <div className="text-black d-flex flex-column justify-content-center">
                        <table>
                          <tr>
                            <td>Ram Type</td>
                            <td className="row-data">{names.ram_type}</td>
                          </tr>
                          <tr>
                            <td>Processor Gen</td>
                            <td className="row-data">{names.processor_gen}</td>
                          </tr>
                          <tr>
                            <td>Hard Disk Type</td>
                            <td className="row-data">{names.hard_disk_type}</td>
                          </tr>
                          <tr>
                            <td>Location</td>
                            <td className="row-data">{names.location}</td>
                          </tr>
                          <tr>
                            <td>Organization</td>
                            <td className="row-data">{names.organization}</td>
                          </tr>
                          <tr>
                            <td>Mouse</td>
                            <td className="row-data">{names.mouse}</td>
                          </tr>
                          <tr>
                            <td>Asset Type</td>
                            <td className="row-data">{names.asset_type}</td>
                          </tr>
                          <tr>
                            <td>Ram Slot 2</td>
                            <td className="row-data">{names.ram_slot2}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Check Out */}

            <div style={{ marginTop: "82px", marginLeft: "325px" }}>
              <div className="container">
                <div className="row" style={{ width: "178%", marginLeft: "-52%" }}>
                  <h3
                    className="col-12 col-sm-8 col-md-6 col-lg-4"
                    style={{ width: "300px" }}
                  >
                    Check Out
                  </h3>
                  <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="card">
                      <div className="text-black d-flex flex-column justify-content-center">
                        <table>
                          <tr>
                            <td>Assigned to</td>
                            <td className="row-data" style={{ color: "blue" }}>
                              {names.employee_name}
                            </td>
                          </tr>
                          <tr>
                            <td>Notes</td>
                            <td className="row-data"></td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="card">
                      <div className="text-black d-flex flex-column justify-content-center">
                        <table>
                          <tr>
                            <td>Check-out Date</td>
                            <td className="row-data">{names.purchased_date}</td>
                          </tr>
                          <tr>
                            <td>Check-in Date</td>
                            <td className="row-data">No Date</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Creation */}

            <div style={{ marginTop: "82px", marginLeft: "325px" }}>
              <div className="container">
                <div className="row" style={{ width: "178%", marginLeft: "-52%" }}>
                  <h3
                    className="col-12 col-sm-8 col-md-6 col-lg-4"
                    style={{ width: "300px" }}
                  >
                    Creation
                  </h3>
                  <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="card">
                      <div className="text-black d-flex flex-column justify-content-center">
                        <table>
                          <tr>
                            <td>Date Created</td>
                            <td className="row-data">{s}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="card">
                      <div className="text-black d-flex flex-column justify-content-center">
                        <table>
                          <tr>
                            <td>Created by</td>
                            <td className="row-data">{fn}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </SideBar>
  );
}

export default ViewAsset;
