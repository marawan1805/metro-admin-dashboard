import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const RefundRequests = () => {

  const [seniorRequest, setSeniorRequest] = useState([])

  useEffect(() => {
    
    const getData = async () => {
      fetch('https://cairo-metro-senior-refund.vercel.app/api/refund-request/') 
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
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "status",
      headerName: "status",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "reviewedBy",
      headerName: "reviewedBy",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "createdAt",
      headerName: "createdAt",
      flex: 1,
    },
    {
      field: "description",
      headerName: "description",
      flex: 1,
    },
    {
      field: "tripId",
      headerName: "tripId",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "userId",
      flex: 1,
    },
   
  ];

  return (
    <Box m="20px">
      <Header
        title="Refund Requests"
        subtitle="List of All Refund Requests"
      />
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
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default RefundRequests;
