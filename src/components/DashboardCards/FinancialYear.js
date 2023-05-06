import React, { useEffect, useState } from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import asset from "./Asset/asset-management.png";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";
import Year from "./DatePicker";

function FinancialYear() {
  const [isApiHitConfigure, setIsApiHitConfigure] = React.useState(false);

  const [dollarAmount, setDollarAmount] = useState(0);

  const [year, setYear] = useState("");
  const [cost, setCost] = useState(null);

  const getFinancialYear = async () => {
    const response = await fetch(`https://asset-3xk6.onrender.com/asset-cost/${year}`);
    const data = await response.json();
    setCost(data);
  };

  useEffect(() => {
    getFinancialYear();
    setIsApiHitConfigure(true);
  }, [year]);

  return (
    <>
      <div className="my-3">
        Please select year to calculate financial year amount:
        <Year year={year} setValue={(e) => setYear(e.target.value)} />
      </div>
      {isApiHitConfigure ? (
        <div className="box" style={{ background: "#de542c" }}>
          <p>
            <span>Financial Year Amount</span>
            <span
              className="two"
              style={{
                fontFamily: "URW Chancery L, cursive",
                fontSize: "30px",
              }}
            >
              ₹{cost ? cost.totalCost : "0"}
            </span>
          </p>
          <img src={asset} alt="" className="dash-img" />
          <div className="button-box">
            <button>
              View Detail{" "}
              <span>
                <ArrowCircleRightIcon />
              </span>
            </button>
          </div>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

export default FinancialYear;
