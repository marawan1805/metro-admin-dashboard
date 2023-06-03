import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from "react";

const SeniorRequests = () => {

  const [seniorRequest, setSeniorRequest] = useState([])

  useEffect(() => {
    
    const getData = async () => {
      fetch('https://cairo-metro-senior-refund.vercel.app/api/senior-request/') 
      .then(res => res.json())
      .then(data => {
        setSeniorRequest(data)
      })
    }
    getData()

  }, [])

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "userId",
      headerName: "UserID",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "idImage",
      headerName: "ImageID",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "reviewedBy",
      headerName: "Reviewed By",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Senior Requests" subtitle="List of All Senior Requests" />
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
          components={{Toolbar: GridToolbar}}/>
      </Box>
    </Box>
  );
};

export default SeniorRequests;
