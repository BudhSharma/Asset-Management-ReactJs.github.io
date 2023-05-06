import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const columns = [
  { field: "id", headerName: "ASSET TAG ID", width: 200 },
  { field: "description", headerName: "DESCRIPTION", width: 200 },
  { field: "checkOut", headerName: "CHECK-OUT DATE", width: 200 },
  { field: "employee_name", headerName: "ASSIGNED TO", width: 200 },
  //   {
  //     field: "fullName",
  //     headerName: "Full name",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  //   },
];

export default function CheckOut() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getNames();
  }, []);

  const getNames = () => {
    axios
      .get("https://asset-3xk6.onrender.com/asset")
      .then((response) => {
        const filter = response.data.map((n) => {
          return {
            id: n.assetId,
            description: n.description,
            checkOut: n.checkOut,
            employee_name:
              n.employee_name == -1 ? "Not assigned" : n.employee_name,
          };
        });
        setRows(filter);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(rows)
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
