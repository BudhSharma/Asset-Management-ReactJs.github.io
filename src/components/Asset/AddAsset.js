import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ExtensionIcon from "@mui/icons-material/Extension";
import "./Asset.css";
import AddLaptop from "./AddLaptop";
import SideBar from "../../Sidebar/SideBar";
import Header from "../Header";
import { Box, CircularProgress } from "@mui/material";

function AddAsset() {
  const [depart, setDepart] = useState([]);
  const [emp, setEmp] = useState([]);
  const [org, setOrg] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrgnaization = () => {
    axios
      .get("https://asset-3xk6.onrender.com/company")
      .then((response) => {
        setOrg(response.data);
      })
      .catch((err) => console.log(err));
  };

  const getEmp = () => {
    axios
      .get("https://asset-3xk6.onrender.com/employee")
      .then((response) => {
        setEmp(response.data);
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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

  useEffect(() => {
    getDepartment();
    getEmp();
    getOrgnaization();
  }, []);
  const [inpval, setInpval] = useState({
    checkOut: "",
    checkIn: "",
    disposed: "0",
    assetId: "",
    purchased_from: "",
    purchased_date: "",
    description: "",
    serial_no: "",
    employee_code: "",
    brand: "",
    organization: "",
    cost: "",
    asset_type: "",
    department: "",
    employee_name: "",

    processor: "",
    processor_gen: "",
    ram: "",
    ram_type: "",
    ram_slot1: "",
    ram_slot2: "",
    location: "",
    os_version: "",
    hard_disk: "",
    hard_disk_type: "",
    mouse: "",
    mouse_brand: "",
    keyboard: "",
    charger: "",
  });

  const [isFormVisible, setIsFormVisible] = useState(null);

  const setVal = (e) => {
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
    if (e.target.name === "asset_type") {
      setIsFormVisible(e.target.value);
    }
  };

  const [file, setFile] = useState(null);

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const addUserdata = async (e) => {
    e.preventDefault();

    const {
      checkOut,
      checkIn,
      disposed,
      assetId,
      purchased_from,
      purchased_date,
      description,
      serial_no,
      employee_code,
      brand,
      organization,
      cost,
      asset_type,
      department,
      employee_name,

      processor,
      processor_gen,
      ram,
      ram_type,
      ram_slot1,
      ram_slot2,
      location,
      os_version,
      hard_disk,
      hard_disk_type,
      mouse,
      mouse_brand,
      keyboard,
      charger,
    } = inpval;

    if (assetId === "") {
      toast.warning("assetId is required!", {
        position: "top-center",
      });
    } else if (file === null) {
      toast.warning("Please upload asset image!", {
        position: "top-center",
      });
    } else if (purchased_date === "") {
      toast.warning("purchased_date is required!", {
        position: "top-center",
      });
    } else if (description === "") {
      toast.warning("description is required!", {
        position: "top-center",
      });
    } else if (serial_no === "") {
      toast.warning("serial_no is required!", {
        position: "top-center",
      });
    } else if (brand === "") {
      toast.warning("brand is required!", {
        position: "top-center",
      });
    } else if (cost === "") {
      toast.warning("cost is required!", {
        position: "top-center",
      });
    } else if (asset_type === "") {
      toast.warning("asset_type is required!", {
        position: "top-center",
      });
    } else {
      if (isFormVisible === "laptop") {
        if (processor === "") {
          toast.warning("Processor is required!", {
            position: "top-center",
          });
        } else if (processor_gen === "") {
          toast.warning("processor_gen is required!", {
            position: "top-center",
          });
        } else if (ram_type === "") {
          toast.warning("ram_type is required!", {
            position: "top-center",
          });
        } else if (location === "") {
          toast.warning("location is required!", {
            position: "top-center",
          });
        } else if (os_version === "") {
          toast.warning("os_version is required!", {
            position: "top-center",
          });
        } else if (hard_disk === "") {
          toast.warning("hard_disk is required!", {
            position: "top-center",
          });
        } else if (hard_disk_type === "") {
          toast.warning("hard_disk_type is required!", {
            position: "top-center",
          });
        } else if (ram === "") {
          toast.warning("RAM is required!", {
            position: "top-center",
          });
        } else {
          const setNewVal = (val) => {
            if (val === "") return "-1";
            return val;
          };
          let _employee_code = setNewVal(employee_code),
            _processor = setNewVal(processor),
            _processor_gen = setNewVal(processor_gen),
            _ram = setNewVal(ram),
            _ram_type = setNewVal(ram_type),
            _ram_slot1 = setNewVal(ram_slot1),
            _ram_slot2 = setNewVal(ram_slot2),
            _location = setNewVal(location),
            _os_version = setNewVal(os_version),
            _hard_disk = setNewVal(hard_disk),
            _hard_disk_type = setNewVal(hard_disk_type),
            _mouse = setNewVal(mouse),
            _mouse_brand = setNewVal(mouse_brand),
            _keyboard = setNewVal(keyboard),
            _charger = setNewVal(charger),
            _checkOut = setNewVal(checkOut),
            _checkIn = setNewVal(checkIn),
            _employee_name = setNewVal(employee_name),
            _department = setNewVal(department),
            _purchased_from = setNewVal(purchased_from);

          const fd = {
            checkIn: _checkIn,
            checkOut: _checkOut,
            employee_code: _employee_code,
            processor: _processor,
            processor_gen: _processor_gen,
            ram: _ram,
            ram_type: _ram_type,
            ram_slot1: _ram_slot1,
            ram_slot2: _ram_slot2,
            location: _location,
            os_version: _os_version,
            hard_disk: _hard_disk,
            hard_disk_type: _hard_disk_type,
            mouse: _mouse,
            mouse_brand: _mouse_brand,
            keyboard: _keyboard,
            charger: _charger,

            assetId: assetId,
            purchased_from: _purchased_from,
            purchased_date: purchased_date,
            description: description,
            serial_no: serial_no,
            brand: brand,
            organization: organization,
            cost: cost,
            asset_type: asset_type,
            department: _department,
            employee_name: _employee_name,
            file: file,
            disposed: disposed,
          };
          const formData = new FormData();
          for (let i = 0; i < Object.keys(fd).length; i++) {
            let key = Object.keys(fd)[i],
              value = Object.values(fd)[i];
            formData.append(key, value);
          }
          // const formData = new FormData();
          // formData.append("assetId", assetId);
          // formData.append("purchased_from", purchased_from);
          // formData.append("purchased_date", purchased_date);
          // formData.append("description", description);
          // formData.append("serial_no", serial_no);
          // formData.append("employee_code", employee_code);
          // formData.append("brand", brand);
          // formData.append("organization", organization);
          // formData.append("cost", cost);
          // formData.append("asset_type", asset_type);
          // formData.append("department", department);
          // formData.append("employee_name", employee_name);

          // formData.append("processor", processor);
          // formData.append("processor_gen", processor_gen);
          // formData.append("ram", ram);
          // formData.append("ram_type", ram_type);
          // formData.append("ram_slot1", ram_slot1);
          // formData.append("ram_slot2", ram_slot2);
          // formData.append("location", location);
          // formData.append("os_version", os_version);
          // formData.append("hard_disk", hard_disk);
          // formData.append("hard_disk_type", hard_disk_type);
          // formData.append("owner", owner);
          // formData.append("mouse", mouse);
          // formData.append("mouse_brand", mouse_brand);
          // formData.append("keyboard", keyboard);
          // formData.append("charger", charger);
          // formData.append("file", file);
          setLoading(true);
          const data = await axios
            .post("https://asset-3xk6.onrender.com/asset", formData, {
              headers: {
                //   "Content-Type": "application/json",
                "Content-Type": "multipart/form-data",
              },
            })
            .catch((error) => {
              if (error.response.status === 409) {
                toast.warning("Asset Id is already exists", {
                  position: "top-center",
                });
              }
            });

          // const res = await data.json();

          if (data.status === 201) {
            toast.success("Registration Successfully done 😃!", {
              position: "top-center",
            });
            setLoading(false);
            setInpval({
              ...inpval,
              checkOut: "",
              checkIn: "",
              assetId: "",
              purchased_from: "",
              purchased_date: "",
              description: "",
              serial_no: "",
              employee_code: "",
              brand: "",
              organization: "",
              cost: "",
              asset_type: "",
              department: "",
              employee_name: "",

              processor: "",
              processor_gen: "",
              ram: "",
              ram_type: "",
              ram_slot1: "",
              ram_slot2: "",
              location: "",
              os_version: "",
              hard_disk: "",
              hard_disk_type: "",
              mouse: "",
              mouse_brand: "",
              keyboard: "",
              charger: "",
            });
            setFile(null);
          }
        }
      } else {
        const setNewVal = (val) => {
          if (val === "") return "-1";
          return val;
        };
        let _employee_code = setNewVal(employee_code),
          _processor = setNewVal(processor),
          _processor_gen = setNewVal(processor_gen),
          _ram = setNewVal(ram),
          _ram_type = setNewVal(ram_type),
          _ram_slot1 = setNewVal(ram_slot1),
          _ram_slot2 = setNewVal(ram_slot2),
          _location = setNewVal(location),
          _os_version = setNewVal(os_version),
          _hard_disk = setNewVal(hard_disk),
          _hard_disk_type = setNewVal(hard_disk_type),
          _mouse = setNewVal(mouse),
          _mouse_brand = setNewVal(mouse_brand),
          _keyboard = setNewVal(keyboard),
          _charger = setNewVal(charger),
          _checkOut = setNewVal(checkOut),
          _checkIn = setNewVal(checkIn),
          _employee_name = setNewVal(employee_name),
          _department = setNewVal(department),
          _purchased_from = setNewVal(purchased_from);

        const fd = {
          checkIn: _checkIn,
          checkOut: _checkOut,
          employee_code: _employee_code,
          processor: _processor,
          processor_gen: _processor_gen,
          ram: _ram,
          ram_type: _ram_type,
          ram_slot1: _ram_slot1,
          ram_slot2: _ram_slot2,
          location: _location,
          os_version: _os_version,
          hard_disk: _hard_disk,
          hard_disk_type: _hard_disk_type,
          mouse: _mouse,
          mouse_brand: _mouse_brand,
          keyboard: _keyboard,
          charger: _charger,

          assetId: assetId,
          purchased_from: _purchased_from,
          purchased_date: purchased_date,
          description: description,
          serial_no: serial_no,
          brand: brand,
          organization: organization,
          cost: cost,
          asset_type: asset_type,
          department: _department,
          employee_name: _employee_name,
          file: file,
          disposed: disposed,
        };
        const formData = new FormData();
        for (let i = 0; i < Object.keys(fd).length; i++) {
          let key = Object.keys(fd)[i],
            value = Object.values(fd)[i];
          formData.append(key, value);
        }
        // formData.push(fd);
        // formData.append("assetId", assetId);
        // formData.append("purchased_from", purchased_from);
        // formData.append("purchased_date", purchased_date);
        // formData.append("description", description);
        // formData.append("serial_no", serial_no);
        // // formData.append("employee_code", employee_code);
        // formData.append("brand", brand);
        // formData.append("organization", organization);
        // formData.append("cost", cost);
        // formData.append("asset_type", asset_type);
        // formData.append("department", department);
        // formData.append("employee_name", employee_name);

        // formData.append("processor", processor);
        // formData.append("processor_gen", processor_gen);
        // formData.append("ram", ram);
        // formData.append("ram_type", ram_type);
        // formData.append("ram_slot1", ram_slot1);
        // formData.append("ram_slot2", ram_slot2);
        // formData.append("location", location);
        // formData.append("os_version", os_version);
        // formData.append("hard_disk", hard_disk);
        // formData.append("hard_disk_type", hard_disk_type);
        // formData.append("owner", owner);
        // formData.append("mouse", mouse);
        // formData.append("mouse_brand", mouse_brand);
        // formData.append("keyboard", keyboard);
        // formData.append("charger", charger);
        // formData.append("file", file);
        setLoading(true);
        const data = await axios
          .post("https://asset-3xk6.onrender.com/asset", formData, {
            headers: {
              //   "Content-Type": "application/json",
              "Content-Type": "multipart/form-data",
            },
          })
          .catch((error) => {
            if (error.response.status === 409) {
              toast.warning("Asset Id is already exists", {
                position: "top-center",
              });
            }
          });

        // const res = await data.json();

        if (data.status === 201) {
          toast.success("Registration Successfully done 😃!", {
            position: "top-center",
          });
          setLoading(false);
          setInpval({
            ...inpval,
            checkOut: "",
            checkIn: "",
            assetId: "",
            purchased_from: "",
            purchased_date: "",
            description: "",
            serial_no: "",
            employee_code: "",
            brand: "",
            organization: "",
            cost: "",
            asset_type: "",
            department: "",
            employee_name: "",

            processor: "",
            processor_gen: "",
            ram: "",
            ram_type: "",
            ram_slot1: "",
            ram_slot2: "",
            location: "",
            os_version: "",
            hard_disk: "",
            hard_disk_type: "",
            mouse: "",
            mouse_brand: "",
            keyboard: "",
            charger: "",
          });
          setFile(null);
        }
      }
      // console.log("user registration succesfully done");
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

  return (
    <SideBar>
      <Header />
      <>
        <div className="display-section" style={{ marginTop: "80px" }}>
          <section>
            <div className="form_data" style={{ height: "720px" }}>
              <div className="form_heading">
                <h2>
                  <ExtensionIcon /> Add Asset
                </h2>
              </div>

              <form>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form_input d-flex align-items-center">
                      <label htmlFor="assetId">
                        Asset Tag ID <sup style={{ color: "red" }}>*</sup>
                      </label>
                      <input
                        type="number"
                        onChange={setVal}
                        value={inpval.assetId}
                        name="assetId"
                        id="assetId"
                        // placeholder="Enter Name"
                      />
                    </div>

                    <div className="form_input d-flex align-items-center">
                      <label htmlFor="purchased_date">
                        Purchased date <sup style={{ color: "red" }}>*</sup>
                      </label>
                      <input
                        type="date"
                        onChange={setVal}
                        value={inpval.purchased_date}
                        name="purchased_date"
                        id="purchased_date"
                        // placeholder="Enter Mobile Number"
                      />
                    </div>
                    <div className="form_input d-flex align-items-center">
                      <label htmlFor="serial_no">
                        Serial no <sup style={{ color: "red" }}>*</sup>
                      </label>
                      <input
                        type="number"
                        value={inpval.serial_no}
                        onChange={setVal}
                        name="serial_no"
                        id="serial_no"
                        // placeholder="Enter password"
                      />
                    </div>
                    <div className="form_input d-flex align-items-center">
                      <label htmlFor="brand">
                        Brand <sup style={{ color: "red" }}>*</sup>
                      </label>
                      <input
                        type="text"
                        value={inpval.brand}
                        onChange={setVal}
                        name="brand"
                        id="brand"
                        // placeholder="Enter password"
                      />
                    </div>
                    <div className="form_input d-flex align-items-center">
                      <label htmlFor="cost">
                        Cost <sup style={{ color: "red" }}>*</sup>
                      </label>
                      <input
                        type="text"
                        value={inpval.cost}
                        onChange={setVal}
                        name="cost"
                        id="cost"
                        // placeholder="Enter password"
                      />
                    </div>

                    <div className="form_input d-flex align-items-center">
                      <label htmlFor="checkIn">Check-In Date</label>
                      <input
                        type="date"
                        value={inpval.checkIn}
                        onChange={setVal}
                        name="checkIn"
                        id="checkIn"
                        // placeholder="Enter password"
                      />
                    </div>

                    <div className="form_input d-flex align-items-center">
                      <label htmlFor="location">
                        Location <sup style={{ color: "red" }}>*</sup>
                      </label>
                      <input
                        required="required"
                        type="text"
                        value={inpval.location}
                        onChange={setVal}
                        name="location"
                        id="location"
                        // placeholder="Enter password"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form_input d-flex align-items-center">
                      <label htmlFor="purchased_from">Purchased from</label>
                      <input
                        type="text"
                        onChange={setVal}
                        value={inpval.purchased_from}
                        name="purchased_from"
                        id="purchased_from"
                        // placeholder="Enter Email Address"
                      />
                    </div>
                    <div className="form_input d-flex align-items-center">
                      <label htmlFor="description">
                        Description <sup style={{ color: "red" }}>*</sup>
                      </label>
                      <input
                        type="text"
                        value={inpval.description}
                        onChange={setVal}
                        name="description"
                        id="description"
                        // placeholder="Enter password"
                      />
                    </div>
                    <div className="form_input d-flex align-items-center">
                      <label htmlFor="employee_code">Department</label>
                      <select
                        required="required"
                        className="select form-select"
                        value={inpval.department}
                        onChange={setVal}
                        name="department"
                        style={{
                          width: "387px",
                          padding: "10px",
                        }}
                      >
                        <option value="">Select Department</option>
                        {depart.map((item) => (
                          <option key={item._id} value={item.department}>
                            {item.department}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form_input d-flex align-items-center">
                      <label htmlFor="employee_code">Employee Name</label>
                      <select
                        required="required"
                        className="select form-select"
                        value={inpval.employee_name}
                        onChange={setVal}
                        name="employee_name"
                        style={{
                          width: "387px",
                          padding: "10px",
                          marginTop: "13px",
                        }}
                      >
                        <option value="">Select employee name</option>
                        {emp.map((item) => (
                          <option key={item._id} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form_input d-flex align-items-center">
                      <label htmlFor="employee_code">
                        Organization <sup style={{ color: "red" }}>*</sup>
                      </label>
                      <select
                        required="required"
                        className="select form-select"
                        value={inpval.organization}
                        onChange={setVal}
                        name="organization"
                        style={{
                          width: "387px",
                          padding: "10px",
                          marginTop: "13px",
                        }}
                      >
                        <option value="">Select organization name</option>
                        {org.map((item) => {
                          return (
                            <option key={item._id} value={item.company}>
                              {item.company}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    {/* <div className="form_input d-flex align-items-center">
                      <label htmlFor="organization">
                        Organization <sup style={{ color: "red" }}>*</sup>
                      </label>
                      <input
                        type="text"
                        value={inpval.organization}
                        onChange={setVal}
                        name="organization"
                        id="organization"
                        // placeholder="Enter password"
                      />
                    </div> */}

                    <div className="form_input d-flex align-items-center">
                      <label htmlFor="checkOut">
                        Check-Out Date <sup style={{ color: "red" }}>*</sup>
                      </label>
                      <input
                        type="date"
                        value={inpval.checkOut}
                        onChange={setVal}
                        name="checkOut"
                        id="checkOut"
                        // placeholder="Enter password"
                      />
                    </div>

                    <div className="form_input d-flex align-items-center">
                      <label htmlFor="asset_type">
                        Asset type <sup style={{ color: "red" }}>*</sup>
                      </label>
                      <select
                        className="form-select slt"
                        value={inpval.asset_type}
                        name="asset_type"
                        onChange={setVal}
                        style={{ width: "387px", height: "40px" }}
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
                </div>
                {isFormVisible === "" && ""}
                {isFormVisible === "Laptop" && (
                  <AddLaptop inpval={inpval} setVal={setVal} />
                )}
                {isFormVisible === "laptop" && (
                  <AddLaptop inpval={inpval} setVal={setVal} />
                )}
                {isFormVisible === "computer" && (
                  <AddLaptop inpval={inpval} setVal={setVal} />
                )}
                {isFormVisible === "Computer" && (
                  <AddLaptop inpval={inpval} setVal={setVal} />
                )}
                {isFormVisible === "Tablet" && (
                  <AddLaptop inpval={inpval} setVal={setVal} />
                )}
                {isFormVisible === "tablet" && (
                  <AddLaptop inpval={inpval} setVal={setVal} />
                )}
                <div
                  className="row"
                  style={{
                    marginTop: "30px",
                    borderTop: "1px solid #80808069",
                  }}
                >
                  <h3
                    style={{
                      marginTop: "30px",
                      paddingBottom: "15px",
                    }}
                  >
                    Asset Photo
                  </h3>
                  <div className="form_input d-flex align-items-center">
                    <input type="file" onChange={handleFileInputChange} />
                    {file && (
                      <div>
                        <img
                          className="img"
                          src={URL.createObjectURL(file)}
                          alt="preview"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <button
                  className="btn"
                  onClick={addUserdata}
                  disabled={loading}
                >
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
                    "Add an Asset"
                  )}
                </button>
              </form>
              <ToastContainer />
            </div>
          </section>
        </div>
      </>
    </SideBar>
  );
}

export default AddAsset;
