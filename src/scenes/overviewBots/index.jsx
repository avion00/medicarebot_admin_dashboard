import React, { useState } from "react";

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
import LineChart from "../../components/LineChart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { DataGrid } from "@mui/x-data-grid";
import { ErrorLogsAndAlertData } from "../../data/errorLogsAndAlertData";
import { BotListData } from "../../data/botListData";

const OverviewBots = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");

  const BotListColumn = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "botName",
      headerName: "Bot Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "clientName",
      headerName: "Client Name",
      flex: 1,
    },
    {
      field: "botType",
      headerName: "Bot Type",
      flex: 1,
    },
    {
      field: "lastActive",
      headerName: "Last Active",
      flex: 1,
    },

    {
      field: "status",
      headerName: "Status",
      flex: 0.75,
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
            onClick={() => handleView(params.row.id)}
            aria-label="edit"
            sx={{ color: colors.greenAccent[200] }}
          >
            <VisibilityIcon sx={{ fontSize: "16px" }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  const ErrorLogsAndAlertColumn = [
    { field: "id", headerName: "ID", flex: 0.125 },
    {
      field: "botName",
      headerName: "Bot Name",
      flex: 0.35,
      // cellClassName: "name-column--cell",
    },
    {
      field: "errorType",
      headerName: "Error Type",
      flex: 0.45,
    },
    {
      field: "errorDetails",
      headerName: "Error Details",
      flex: 1,
    },

    {
      field: "lastActive",
      headerName: "Last Active",
      flex: 0.5,
    },
  ];

  const handleCheckboxChange = (ids) => {
    // submittion code
  };

  const handleView = (id) => {
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

        <Box
          gridColumn={isNonMobile ? "span 12" : "span 12"}
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          borderRadius="4px"
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            px={3}
            py={2}
            color={colors.grey[100]}
          >
            Bot Performance Overview
          </Typography>
          <Box
            sx={{
              borderBottom: `2px groove ${colors.blueAccent[700]}`,
            }}
          >
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Box
                px={3}
                py={1.25}
                pr={8}
                sx={{
                  width: "fit-content",
                  background: "linear-gradient(45deg, #062994, #0E72E1)",
                  color: "#fff",
                  borderRadius: "0 8px 0 0",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                <Typography fontWeight={600} lineHeight={1.8} fontSize="1.1em">
                  Total Bots
                </Typography>
                <Typography fontWeight={300} fontSize="1em">
                  352
                </Typography>
              </Box>
              <Box
                px={3}
                py={1.25}
                sx={{
                  width: "fit-content",
                  // background: "linear-gradient(45deg, #062994, #0E72E1)",
                  // color: "#fff",
                  borderRadius: "8px 8px 0 0",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                <Typography fontWeight={600} lineHeight={1.8} fontSize="1.1em">
                  Active
                </Typography>
                <Typography fontWeight={300} fontSize="1em">
                  33
                </Typography>
              </Box>
              <Box
                px={3}
                py={1.25}
                sx={{
                  width: "fit-content",
                  // background: "linear-gradient(45deg, #062994, #0E72E1)",
                  // color: "#fff",
                  borderRadius: "8px 8px 0 0",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                <Typography fontWeight={600} lineHeight={1.8} fontSize="1.1em">
                  Suspended
                </Typography>
                <Typography fontWeight={300} fontSize="1em">
                  45
                </Typography>
              </Box>
              <Box
                px={3}
                py={1.25}
                sx={{
                  width: "fit-content",
                  // background: "linear-gradient(45deg, #062994, #0E72E1)",
                  // color: "#fff",
                  borderRadius: "8px 0 0 0",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                <Typography fontWeight={600} lineHeight={1.8} fontSize="1.1em">
                  Error
                </Typography>
                <Typography fontWeight={300} fontSize="1em">
                  252
                </Typography>
              </Box>
              <Box
                px={3}
                py={1.25}
                sx={{
                  width: "fit-content",
                  borderRadius: "8px 0 0 0",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                <Typography fontWeight={600} lineHeight={1.8} fontSize="1.1em">
                  Average Response Time
                </Typography>
                <Typography fontWeight={300} fontSize="1em">
                  32 sec
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box height="300px" width="80%">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

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
              rows={BotListData}
              columns={BotListColumn}
              getRowId={(row) => row.id}
              onSelectionModelChange={handleCheckboxChange}
              rowHeight={40}
              headerHeight={40}
            />
          </Box>
        </Box>
        {/* Row 3 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          pt=".5em"
          mt={4}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            p="0 2em"
          >
            <Typography variant="h3" fontWeight="bold">
              Error Logs and Alert
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
              rows={ErrorLogsAndAlertData}
              columns={ErrorLogsAndAlertColumn}
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

export default OverviewBots;
