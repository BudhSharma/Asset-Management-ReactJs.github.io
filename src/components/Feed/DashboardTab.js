import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CheckOut from "./CheckedOut";
import CheckIn from "./CheckIn";
import UnderRepair from "./UnderRepair";
import Lost from "./Lost";
import axios from "axios";
import SideBar from "../../Sidebar/SideBar";
import Header from "../Header";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    axios
      .get("https://asset-3xk6.onrender.com/asset")
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => console.log(err));
    setValue(newValue);
  };

  return (
    <SideBar>
      <Header />
      <div style={{ marginTop: "80px" }}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <h1 style={{ marginLeft: "600px" }}>FEED</h1>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Checked out" value="1" />
                <Tab label="Checked in" value="2" />
                <Tab label="Under Repair" value="3" />
                <Tab label="Lost" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <CheckOut />
            </TabPanel>
            <TabPanel value="2">
              <CheckIn />
            </TabPanel>
            <TabPanel value="3">
              <UnderRepair />
            </TabPanel>
            <TabPanel value="4">
              <Lost />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </SideBar>
  );
}
