import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const Schedule = () => {

  const [seniorRequest, setSeniorRequest] = useState([])

  useEffect(() => {
    
    const getData = async () => {
      fetch('https://metro-admin-gray.vercel.app/api/admin/schedules/') 
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
    { field: "_id", headerName: "ID", flex: 0.5 },
    
    {
      field: "stop_name",
      headerName: "stop_name",
      flex: 1,
    },
    {
      field: "stop_id",
      headerName: "stop_id",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "arrival_time",
      headerName: "arrival_time",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "departure_time",
      headerName: "departure_time",
      flex: 1,
    },
    {
      field: "route_id",
      headerName: "route_id",
      flex: 1,
    },
    {
      field: "direction",
      headerName: "direction",
      flex: 1,
    },
   
  ];

  return (
    <Box m="20px">
      <Header
        title="Schedule"
        subtitle="List of The Metro Schedule"
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
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default Schedule;
