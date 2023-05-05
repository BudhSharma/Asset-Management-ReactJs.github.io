import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const columns = [
  { field: "id", headerName: "ASSET TAG ID", width: 200 },
  { field: "description", headerName: "DESCRIPTION", width: 200 },
  { field: "checkIn", headerName: "CHECK-IN DATE", width: 200 },
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

export default function Lost() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getNames();
  }, []);

  const getNames = () => {
    axios
      .get("https://asset-3xk6.onrender.com/asset")
      .then((response) => {
        if (response.data.find((data) => data.status == "2")) {
          const filter = response.data.filter((n) => n.status == "2");
          const set = filter.map((f) => {
            return {
              id: f.assetId,
              description: f.description,
              checkIn: f.checkIn == -1 ? "No Due Date" : f.checkIn,
              employee_name:
                f.employee_name == -1 ? "Not assigned" : f.employee_name,
            };
          });
          setRows(set);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ height: 500, width: "100%" }}>
      {rows.length > 0 ? (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      ) : (
        "No Record Found!"
      )}
    </div>
  );
}
