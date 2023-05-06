import React, { useEffect, useState } from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import value from "./Asset/asset-management.png";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";

function TotalValueOfAsset() {
  const [isApiHitConfigure, setIsApiHitConfigure] = React.useState(false);
  const [dollarAmount, setDollarAmount] = useState(0);
  const [TotalAssets, setTotalAssets] = React.useState(0);

  const totalCost = () => {
    axios
      .get("https://asset-3xk6.onrender.com/asset")
      .then((response) => {
        if (response.data.find((data) => data.checkIn !== "-1")) {
          const filter = response.data.filter((n) => n);
          const set = filter.map((f) => {
            return parseInt(f.cost);
          });
          const sum = set.reduce((total, number) => {
            return total + number;
          }, 0);
          setTotalAssets(sum);
          // Set the API URL and endpoint
          const apiUrl = "https://api.exchangerate-api.com/v4/latest/INR";
          // Construct the API URL with the endpoint and input currency code
          fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
              setDollarAmount(sum * data.rates.USD);
            })
            .catch((error) => console.error(error));
        }
        setIsApiHitConfigure(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    totalCost();
  }, []);

  return (
    <>
      {isApiHitConfigure ? (
        <div className="box" style={{ background: "#eb548c" }}>
          <p>
            <span>Total Cost of all Assets</span>
            <span
              className="two"
              style={{
                fontFamily: "URW Chancery L, cursive",
              }}
            >
              ₹{TotalAssets}
            </span>
          </p>

          <img src={value} alt="" className="dash-img" />

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

export default TotalValueOfAsset;
