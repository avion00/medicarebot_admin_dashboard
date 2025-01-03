import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  InputBase,
} from "@mui/material";
import React, { useState } from "react";

import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { DataGrid } from "@mui/x-data-grid";
import { PartnerData } from "../../data/patnerData";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useNavigate } from "react-router-dom";


const ViewPartners = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");
  const isMobile = useMediaQuery("(min-width:521px)");
    const navigate = useNavigate();


  const PatnerListColumn = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "clientName",
      headerName: "Client Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "contactPerson",
      headerName: "Contact Person",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },

    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" gap=".5em">
          <IconButton
            onClick={() => handleView(params.row.id)}
            aria-label="edit"
            sx={{ color: colors.greenAccent[200] }}
          >
            <VisibilityIcon sx={{ fontSize: "16px" }} />
          </IconButton>
          <IconButton
            onClick={() => handleEdit(params.row.id)}
            aria-label="edit"
            sx={{ color: colors.greenAccent[200] }}
          >
            <EditIcon sx={{ fontSize: "16px" }} />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteActiveClient(params.row.id)}
            aria-label="view"
            sx={{ color: colors.redAccent[400] }}
          >
            <DeleteSweepIcon sx={{ fontSize: "16px" }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleCheckboxChange = (ids) => {
    // submittion code
  };

  const handleEdit = (id) => {
    console.log("Edit clicked for ID:", id);
  };

  const handleView = (id) => {
    console.log("View clicked for ID:", id);
  };

  const [deleteClient, setDeleteClient] = useState([]);

  const handleDeleteActiveClient = (id) => {
    const updatedBots = deleteClient.map((bot) =>
      bot.id === id ? { ...bot, status: "Active" } : bot
    );

    // Remove the reactivated bot from the deactivatedBots list
    const remainingBots = updatedBots.filter(
      (bot) => bot.status === "Inactive"
    );

    setDeleteClient(remainingBots);

    // Update the JSON file (if necessary)
    localStorage.setItem("botsData", JSON.stringify(updatedBots));
  };

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        alignItems="center"
      >
        <Header title="View Patners" subtitle="View Your list of Patners" />
        <Box>
          <Button
            onClick={() => navigate("/addPatners")}
            sx={{
              background: "linear-gradient(45deg, #062994, #0E72E1)",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              marginBottom: isNonMobile ? "inherit" : "2em",
            }}
          >
            <PersonAddIcon sx={{ mr: "10px" }} />
            Add Patners
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}

        <Box
          gridColumn={isNonMobile ? "span 4" : isMobile ? "span 8" : "span 12"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="8px"
        >
          <StatBox
            title="50"
            subtitle="Total Patners"
            progress="0.3"
            increase="+30%"
            icon={
              <PersonOutlineIcon
                sx={{ color: colors.grey[200], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={isNonMobile ? "span 4" : isMobile ? "span 6" : "span 12"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="8px"
        >
          <StatBox
            title="30"
            subtitle="Active Patners"
            progress="0.25"
            increase="+25%"
            icon={
              <SupervisorAccountIcon
                sx={{ color: colors.grey[200], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={isNonMobile ? "span 4" : isMobile ? "span 6" : "span 12"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="8px"
        >
          <StatBox
            title="11"
            subtitle="Inactive Patners"
            progress="0.11"
            increase="+11%"
            icon={
              <PersonAddDisabledIcon
                sx={{ color: colors.grey[200], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
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
              Patner List
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
                  placeholder="Search Partner name or email"
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
              rows={PartnerData}
              columns={PatnerListColumn}
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

export default ViewPartners;
