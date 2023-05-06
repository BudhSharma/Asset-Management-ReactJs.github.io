import React, { useEffect } from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import asset from "./Asset/asset-management (1).png";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";

function AvailableAsset() {
  const [total, setTotal] = React.useState([]);
  const [isApiHitConfigure, setIsApiHitConfigure] = React.useState(false);

  const getAvailableAsset = () => {
    axios
      .get("https://asset-3xk6.onrender.com/asset")
      .then((response) => {
        if (response.data.find((data) => data.checkIn !== "-1")) {
          const filter = response.data.filter((n) => n.checkIn !== "-1");
          const set = filter.map((f) => {
            return f;
          });
          setTotal(set);
        }
        setIsApiHitConfigure(true);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAvailableAsset();
  }, []);

  return (
    <>
      {isApiHitConfigure ? (
        <div className="box" style={{ background: "#1de4bd" }}>
          <p>
            <span>Available Assets</span>
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

export default AvailableAsset;
