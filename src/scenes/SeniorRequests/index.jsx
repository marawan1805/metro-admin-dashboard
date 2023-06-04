import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from "react";

const SeniorRequests = () => {

  const [seniorRequest, setSeniorRequest] = useState([])
  const [reload, setReload] = useState(true)

  useEffect(() => {
    
    const getData = async () => {
      fetch('https://cairo-metro-senior-refund.vercel.app/api/senior-request/') 
      .then(res => res.json())
      .then(data => {
        setSeniorRequest(data)
      })
    }
    getData()

  }, [reload])

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
    {
      field: "accept",
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
  
          const api = params.api;
          const thisRow = {};
  
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
  
          
            (async () => {
              await fetch('https://cairo-metro-senior-refund.vercel.app/api/senior-request/approve', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({"id":thisRow.id})
              });
              setReload(!reload)
              alert('Approved Request')
           
            })();
        };
  
        return <Button variant="contained" onClick={onClick}>Approve</Button>;
      }
    },
    {
      field: "deny",
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
  
          const api = params.api;
          const thisRow = {};
  
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
  
          
            (async () => {
              await fetch('https://cairo-metro-senior-refund.vercel.app/api/senior-request/reject', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({"id":thisRow.id})
              });
              setReload(!reload)
              alert('Rejected Request')
           
            })();
        };
  
        return <Button variant="contained" onClick={onClick}>Reject</Button>;
      }
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
