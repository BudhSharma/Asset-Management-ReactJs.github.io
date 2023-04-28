import React from "react";
import { ToastContainer } from "react-toastify";
import "./Asset.css";
import SideBar from "../../Sidebar/SideBar";
import Header from "../Header";

function AddLaptop(props) {
  return (
    <>
      <div className="form_data" style={{height:"780px"}}>
        <form
          style={{
            marginLeft: "-10px",
            marginTop: "10px",
            padding: "0px",
            borderTop: "1px solid #80808069",
            // borderRadius: "0px",
          }}
        >
          <div className="row" style={{ marginTop: "30px" }}>
            <div className="col-lg-6">
              <div className="form_input d-flex align-items-center">
                <label htmlFor="processor">
                  Processor <sup style={{ color: "red" }}>*</sup>
                </label>
                <input
                  required="required"
                  type="text"
                  onChange={props.setVal}
                  value={props.inpval.processor}
                  name="processor"
                  id="processor"
                  // placeholder="Enter Name"
                />
              </div>

              <div className="form_input d-flex align-items-center">
                <label htmlFor="processor_gen">
                  Processor gen <sup style={{ color: "red" }}>*</sup>
                </label>
                <input
                  required="required"
                  type="text"
                  onChange={props.setVal}
                  value={props.inpval.processor_gen}
                  name="processor_gen"
                  id="processor_gen"
                  // placeholder="Enter Mobile Number"
                />
              </div>
              <div className="form_input d-flex align-items-center">
                <label htmlFor="ram">
                  RAM <sup style={{ color: "red" }}>*</sup>
                </label>
                <input
                  required="required"
                  type="text"
                  value={props.inpval.ram}
                  onChange={props.setVal}
                  name="ram"
                  id="ram"
                  // placeholder="Enter password"
                />
              </div>
              <div className="form_input d-flex align-items-center">
                <label htmlFor="ram_type">
                  RAM Type <sup style={{ color: "red" }}>*</sup>
                </label>
                <select
                  required="required"
                  className="form-select slt"
                  value={props.inpval.ram_type}
                  name="ram_type"
                  onChange={props.setVal}
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
                  required="required"
                  type="text"
                  value={props.inpval.ram_slot1}
                  onChange={props.setVal}
                  name="ram_slot1"
                  id="ram_slot1"
                  // placeholder="Enter password"
                />
              </div>
              <div className="form_input d-flex align-items-center">
                <label htmlFor="ram_slot2">RAM Slot 2</label>
                <input
                  required="required"
                  type="text"
                  onChange={props.setVal}
                  value={props.inpval.ram_slot2}
                  name="ram_slot2"
                  id="ram_slot2"
                  // placeholder="Enter Email Address"
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="form_input d-flex align-items-center">
                <label htmlFor="location">
                  Location <sup style={{ color: "red" }}>*</sup>
                </label>
                <input
                  required="required"
                  type="text"
                  value={props.inpval.location}
                  onChange={props.setVal}
                  name="location"
                  id="location"
                  // placeholder="Enter password"
                />
              </div>
              <div className="form_input d-flex align-items-center">
                <label htmlFor="os_version">
                  OS Version <sup style={{ color: "red" }}>*</sup>
                </label>
                <input
                  required="required"
                  type="text"
                  value={props.inpval.os_version}
                  onChange={props.setVal}
                  name="os_version"
                  id="os_version"
                  // placeholder="Enter password"
                />
              </div>

              <div className="form_input d-flex align-items-center">
                <label htmlFor="hard_disk">
                  Hard Disk <sup style={{ color: "red" }}>*</sup>
                </label>
                <input
                  required="required"
                  type="text"
                  value={props.inpval.hard_disk}
                  onChange={props.setVal}
                  name="hard_disk"
                  id="hard_disk"
                  // placeholder="Enter password"
                />
              </div>

              <div className="form_input d-flex align-items-center">
                <label htmlFor="hard_disk_type">
                  Hard Disk Type <sup style={{ color: "red" }}>*</sup>
                </label>
                <select
                  required="required"
                  className="form-select slt"
                  value={props.inpval.hard_disk_type}
                  name="hard_disk_type"
                  onChange={props.setVal}
                >
                  <option value="">Select Hard Disk Type</option>
                  <option value="SATA">SATA</option>
                  <option value="PATA">PATA</option>
                  <option value="SCSI">SCSI</option>
                  <option value="SSD">SSD</option>
                </select>
              </div>
              <div className="form_input d-flex align-items-center">
                <label htmlFor="owner">
                  Owner <sup style={{ color: "red" }}>*</sup>
                </label>
                <input
                  required="required"
                  type="text"
                  value={props.inpval.owner}
                  onChange={props.setVal}
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
                    required="required"
                    type="text"
                    value={props.inpval.mouse}
                    onChange={props.setVal}
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
                    value={props.inpval.mouse_brand}
                    onChange={props.setVal}
                    name="mouse_brand"
                    id="mouse_brand"
                    // placeholder="Enter password"
                  />
                </div>
                <div className="form_input d-flex align-items-center">
                  <label htmlFor="keyboard">Keyboard</label>
                  <input
                    required="required"
                    type="text"
                    value={props.inpval.keyboard}
                    onChange={props.setVal}
                    name="keyboard"
                    id="keyboard"
                    // placeholder="Enter password"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form_input d-flex align-items-center">
                  <label htmlFor="charger">Charger</label>
                  <input
                    required="required"
                    type="text"
                    value={props.inpval.charger}
                    onChange={props.setVal}
                    name="charger"
                    id="charger"
                    // placeholder="Enter password"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddLaptop;
