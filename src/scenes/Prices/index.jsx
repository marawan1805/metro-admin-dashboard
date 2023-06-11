import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";

const Prices = () => {

  const [seniorRequest, setSeniorRequest] = useState([])

  useEffect(() => {
    
    const getData = async () => {
      fetch('https://metro-admin-gray.vercel.app/api/admin/prices') 
      .then(res => res.json())
      .then(data => {
        setSeniorRequest(data)
      })
    }
    getData()
    console.log(seniorRequest);

  }, [])

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "_id", headerName: "ID" },
    {
      field: "numOfStations",
      headerName: "numOfStations",
      flex: 1,
    },
    {
      field: "price",
      headerName: "price",
      flex: 1,
    },
   
  ];

  return (
    <Box m="20px">
      <Header title="All Stations" subtitle="List of All Available Stations" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={seniorRequest}
          columns={columns}
          getRowId={(row) => row._id}
          components={{Toolbar: GridToolbar}}/>
      </Box>
    </Box>
  );
};

export default Prices;
