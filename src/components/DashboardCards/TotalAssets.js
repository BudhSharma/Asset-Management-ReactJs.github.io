import React, { useEffect, useState } from "react";
import "./Card.css";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import asset from "./Asset/assets.png";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";

function TotalAssets() {
  const [total, setTotal] = useState([]);
  const [isApiHitConfigure, setIsApiHitConfigure] = React.useState(false);
  const getAsset = () => {
    axios
      .get("https://asset-3xk6.onrender.com/asset")
      .then((res) => setTotal(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAsset();
    setIsApiHitConfigure(true);
  }, []);
  return (
    <>
      {isApiHitConfigure ? (
        <div className="box">
          <p>
            <span>All Assets</span>
            <span
              className="two"
              style={{
                fontFamily: "URW Chancery L, cursive",
                fontSize: "30px",
              }}
            >
              {total.length}
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

export default TotalAssets;
