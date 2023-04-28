import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import SideBar from "../../Sidebar/SideBar";
import Header from "../Header";

function EditAsset() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://asset-3xk6.onrender.com/asset/${id}`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);
  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://asset-3xk6.onrender.com/asset/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();
      //   console.log(json);
      navigate(`/view-asset/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const [names, setNames] = useState([]);
  useEffect(() => {
    getNames();
  }, []);

  const getNames = () => {
    axios
      .get("https://asset-3xk6.onrender.com/category")
      .then((response) => {
        setNames(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    // console.log("Jai siya ram");
  };
  const handleDrawerClose = () => {
    setMobileOpen(false);
    // console.log("prem se bolo Jai siya ram");
  };

  return (
    <SideBar>
      <Header />
      <div
        style={{
          margin: "10px",
          marginTop:"80px"
        }}
      >
        {/* <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={data.brand}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="age"
              value={data.charger}
              onChange={handleInputChange}
            />
            <button type="submit">Save</button>
          </form> */}

        <div className="form_data">
          <div className="form_heading">
            <h2>Update Asset Details</h2>
          </div>

          <form style={{ marginTop: "25px" }} onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6">
                <div className="form_input d-flex align-items-center">
                  <label htmlFor="organization">Organization</label>
                  <input
                    className="ye-dekho"
                    type="text"
                    value={data.organization}
                    onChange={handleInputChange}
                    name="organization"
                    id="organization"
                    // placeholder="Enter password"
                  />
                </div>

                <div className="form_input d-flex align-items-center">
                  <label htmlFor="asset_type">Asset type</label>
                  <select
                    className="form-select slt"
                    value={data.asset_type}
                    onChange={handleInputChange}
                    name="asset_type"
                  >
                    <option value="">Select category</option>
                    {names.map((item) => (
                      <option key={item._id} value={item.category}>
                        {item.category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {data.asset_type === "laptop" ? (
                <div className="form_data">
                  <div className="row" style={{ marginTop: "30px" }}>
                    <div className="col-lg-6">
                      <div className="form_input d-flex align-items-center">
                        <label htmlFor="processor">Processor</label>
                        <input
                          className="ye-dekho"
                          required="required"
                          type="text"
                          value={data.processor}
                          onChange={handleInputChange}
                          name="processor"
                          id="processor"
                          // placeholder="Enter Name"
                        />
                      </div>

                      <div className="form_input d-flex align-items-center">
                        <label htmlFor="processor_gen">Processor gen</label>
                        <input
                          className="ye-dekho"
                          required="required"
                          type="text"
                          value={data.processor_gen}
                          onChange={handleInputChange}
                          name="processor_gen"
                          id="processor_gen"
                          // placeholder="Enter Mobile Number"
                        />
                      </div>
                      <div className="form_input d-flex align-items-center">
                        <label htmlFor="ram">RAM</label>
                        <input
                          className="ye-dekho"
                          required="required"
                          type="text"
                          value={data.ram}
                          onChange={handleInputChange}
                          name="ram"
                          id="ram"
                          // placeholder="Enter password"
                        />
                      </div>
                      <div className="form_input d-flex align-items-center">
                        <label htmlFor="ram_type">RAM Type</label>
                        <select
                          required="required"
                          className="form-select slt"
                          value={data.ram_type}
                          onChange={handleInputChange}
                          name="ram_type"
                        >
                          <option value="">Select RAM Type</option>
                          <option value="SRAM">SRAM</option>
                          <option value="DRAM">DRAM</option>
                          <option value="SDRAM">SDRAM</option>
                          <option value="DDR">DDR</option>
                          <option value="RDRAM ">RDRAM </option>
                        </select>
                      </div>
                      <div className="form_input d-flex align-items-center">
                        <label htmlFor="ram_slot1">RAM Slot 1</label>
                        <input
                          className="ye-dekho"
                          required="required"
                          type="text"
                          value={data.ram_slot1}
                          onChange={handleInputChange}
                          name="ram_slot1"
                          id="ram_slot1"
                          // placeholder="Enter password"
                        />
                      </div>
                      <div className="form_input d-flex align-items-center">
                        <label htmlFor="ram_slot2">RAM Slot 2</label>
                        <input
                          className="ye-dekho"
                          required="required"
                          type="text"
                          value={data.ram_slot2}
                          onChange={handleInputChange}
                          name="ram_slot2"
                          id="ram_slot2"
                          // placeholder="Enter Email Address"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form_input d-flex align-items-center">
                        <label htmlFor="location">Location</label>
                        <input
                          className="ye-dekho"
                          required="required"
                          type="text"
                          value={data.location}
                          onChange={handleInputChange}
                          name="location"
                          id="location"
                          // placeholder="Enter password"
                        />
                      </div>
                      <div className="form_input d-flex align-items-center">
                        <label htmlFor="os_version">OS Version</label>
                        <input
                          className="ye-dekho"
                          required="required"
                          type="text"
                          value={data.os_version}
                          onChange={handleInputChange}
                          name="os_version"
                          id="os_version"
                          // placeholder="Enter password"
                        />
                      </div>

                      <div className="form_input d-flex align-items-center">
                        <label htmlFor="hard_disk">Hard Disk</label>
                        <input
                          className="ye-dekho"
                          required="required"
                          type="text"
                          value={data.hard_disk}
                          onChange={handleInputChange}
                          name="hard_disk"
                          id="hard_disk"
                          // placeholder="Enter password"
                        />
                      </div>

                      <div className="form_input d-flex align-items-center">
                        <label htmlFor="hard_disk_type">Hard Disk Type</label>
                        <select
                          required="required"
                          className="form-select slt"
                          value={data.hard_disk_type}
                          onChange={handleInputChange}
                          name="hard_disk_type"
                        >
                          <option value="">Select Hard Disk Type</option>
                          <option value="SATA">SATA</option>
                          <option value="PATA">PATA</option>
                          <option value="SCSI">SCSI</option>
                          <option value="SSD">SSD</option>
                        </select>
                      </div>
                      <div className="form_input d-flex align-items-center">
                        <label htmlFor="owner">Owner</label>
                        <input
                          className="ye-dekho"
                          required="required"
                          type="text"
                          value={data.owner}
                          onChange={handleInputChange}
                          name="owner"
                          id="owner"
                          // placeholder="Enter password"
                        />
                      </div>
                    </div>
                    <div
                      className="row"
                      style={{
                        // marginLeft: "-140px",
                        borderTop: "1px solid #80808069",
                        marginTop: "30px",
                      }}
                    >
                      <h3
                        style={{
                          marginTop: "30px",
                          paddingBottom: "15px",
                        }}
                      >
                        Asset Details
                      </h3>
                      <div className="col-lg-6">
                        <div className="form_input d-flex align-items-center">
                          <label htmlFor="mouse">Mouse</label>
                          <input
                            className="ye-dekho"
                            required="required"
                            type="text"
                            value={data.mouse}
                            onChange={handleInputChange}
                            name="mouse"
                            id="mouse"
                            // placeholder="Enter password"
                          />
                        </div>
                        <div className="form_input d-flex align-items-center">
                          <label htmlFor="mouse_brand">Mouse Brand</label>
                          <input
                            required="required"
                            type="text"
                            value={data.mouse_brand}
                            onChange={handleInputChange}
                            name="mouse_brand"
                            id="mouse_brand"
                            className="ye-dekho"
                          />
                        </div>
                        <div className="form_input d-flex align-items-center">
                          <label htmlFor="keyboard">Keyboard</label>
                          <input
                            required="required"
                            type="text"
                            value={data.keyboard}
                            onChange={handleInputChange}
                            name="keyboard"
                            id="keyboard"
                            className="ye-dekho"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form_input d-flex align-items-center">
                          <label htmlFor="charger">Charger</label>
                          <input
                            className="ye-dekho"
                            required="required"
                            type="text"
                            value={data.charger}
                            onChange={handleInputChange}
                            name="charger"
                            id="charger"
                            // placeholder="Enter password"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* </form> */}
                </div>
              ) : (
                ""
              )}
            </div>
            <button className="btn">Update an Asset</button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </SideBar>
  );
}

export default EditAsset;
