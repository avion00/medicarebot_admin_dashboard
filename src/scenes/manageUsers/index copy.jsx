import React from "react";

import {
  Box,
  InputBase,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { DataGrid } from "@mui/x-data-grid";
import { ManageUserData } from "../../data/mangeUserData";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ManageUsers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");

  const MangeUsersColumn = [
    { field: "id", headerName: "ID", flex: 0.25 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.75,
    },
    {
      field: "lastLogin",
      headerName: "Last Login",
      flex: 1,
    },

    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      renderCell: (params) => {
        const isActive =
          params.row.status === "active" || params.row.status === "Active";
        return (
          <Typography
            variant="h6"
            sx={{
              backgroundColor: isActive
                ? colors.greenAccent[700]
                : colors.redAccent[700],
              borderRadius: "20px",
              padding: "2px 10px",
            }}
          >
            {params.row.status}
          </Typography>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      flex: 0.5,
      renderCell: (params) => (
        <Box display="flex" gap=".5em">
          <IconButton
            onClick={() => handleMenu(params.row.id)}
            aria-label="menu"
            sx={{ color: colors.greenAccent[200] }}
          >
            <MoreVertIcon sx={{ fontSize: "16px" }} />
          </IconButton>
        </Box>
      ),
    },
  ];


  const handleCheckboxChange = (ids) => {
    // submittion code
  };

  const handleMenu = (id) => {
    console.log("View clicked for ID:", id);
  };

  return (
    <Box m="20px">
      <Box display="flex" alignItems="center" flexWrap="wrap">
        <Header title="OVERVIEW BOTS" subtitle="Observe your Bots" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          mt={2}
          pt=".5em"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            p="0 2em"
          >
            <Typography variant="h3" fontWeight="bold">
              Bots List
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                gap: "1em",
              }}
            >
              <Box
                display="flex"
                backgroundColor={colors.grey[500]}
                borderRadius="0px"
                width="250px"
                sx={{
                  width: "220px",
                  borderRadius: "25px",
                  margin: ".5em .5em .5em 3em",
                  backgroundColor: "#ccc",
                  border: `1px solid white`,
                  color: "#000",
                }}
              >
                <InputBase
                  sx={{ ml: 2, flex: 1, color: "#000" }}
                  placeholder="Search"
                />
                <IconButton type="button" sx={{ p: 1 }}>
                  <SearchIcon sx={{ color: "#000" }} />
                </IconButton>
              </Box>
              <Box
                onClick={() => console.log("Filter By Clicked")}
                sx={{
                  flex: 0.25,
                  padding: "0.6em 1em ",
                  width: "fit-content",
                  position: "relative",
                  background: "linear-gradient(45deg, #062994, #0E72E1)",
                  color: "#fff",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: ".5em",
                  cursor: "pointer",
                }}
              >
                <FilterAltIcon />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  textAlign="center"
                  width="60px"
                >
                  Filter By
                </Typography>
                <ArrowDropDownIcon />
              </Box>
            </Box>
          </Box>

          <Box
            gridColumn="span 12"
            height="240px"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.blueAccent[200],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.primary[400],
                borderBottom: `1px solid ${colors.grey[700]}`,
                borderRadius: "0 !important",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: `1px solid ${colors.grey[700]}`,
                backgroundColor: colors.primary[400],
                height: "40px !important",
                minHeight: "40px !important",
              },
              "& .MuiCheckbox-root": {
                color: `${colors.blueAccent[200]} !important`,
              },
            }}
          >
            <DataGrid
              checkboxSelection
              rows={ManageUserData}
              columns={MangeUsersColumn}
              getRowId={(row) => row.id}
              onSelectionModelChange={handleCheckboxChange}
              rowHeight={40}
              headerHeight={40}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ManageUsers;
