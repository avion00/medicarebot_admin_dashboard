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
import { RecentActivityData } from "../../data/RecentActivityData";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { DataGrid } from "@mui/x-data-grid";
import { ActiveClients } from "../../data/activeClients";
import { ActiveBots } from "../../data/activeBots";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
// import RadarChart from "../../components/RadarChart";
// import { ResponseTimeTrendsData } from "../../data/responseTimeTrendsData";
import ResponseTimeTrends from "../../components/ResponseTimeTrends";
import BotActivityBreakDown from "../../components/BotActivityBreakDown";
import ServerUptime from "../../components/ServerUptime";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");
  const isMobile = useMediaQuery("(min-width:521px)");

  const ActiveClientsColumn = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "clientName",
      headerName: "Client Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "totalBots",
      headerName: "Total Bots",
      flex: 1,
    },
    {
      field: "lastActive",
      headerName: "Last Active",
      flex: 1,
    },

    {
      field: "assignManager",
      headerName: "Assign Manager",
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

  const ActiveBotsColumn = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "botname",
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
      field: "usageStats",
      headerName: "Usage Stats",
      flex: 1,
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const isActive = params.row.status === "active" || params.row.status === "Active";
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
        <Header
          title="DASHBOARD"
          subtitle="Welcome to your Medicare Bot Dashboard"
        />
        <Box>
          <Button
            sx={{
              background: "linear-gradient(45deg, #062994, #0E72E1)",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              marginBottom: isNonMobile ? "inherit" : "2em",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
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
          gridColumn={isNonMobile ? "span 3" : isMobile ? "span 6" : "span 12"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="8px"
        >
          <StatBox
            title="221"
            subtitle="Active Bots"
            progress="0.71"
            increase="+71%"
            icon={
              <SmartToyIcon
                sx={{ color: colors.grey[200], fontSize: "26px" }}
              />
            }
          />
        </Box>
        
        <Box
          gridColumn={isNonMobile ? "span 3" : isMobile ? "span 6" : "span 12"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="8px"
        >
          <StatBox
            title="550"
            subtitle="Total Clients"
            progress="0.9"
            increase="+90%"
            icon={
              <PersonOutlineIcon
                sx={{ color: colors.grey[200], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={isNonMobile ? "span 3" : isMobile ? "span 6" : "span 12"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="8px"
        >
          <StatBox
            title="130"
            subtitle="Active Users"
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
          gridColumn={isNonMobile ? "span 3" : isMobile ? "span 6" : "span 12"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="8px"
        >
          <StatBox
            title="151"
            subtitle="Key Metrics"
            progress="0.35"
            increase="+35%"
            icon={
              <SignalCellularAltOutlinedIcon
                sx={{ color: colors.grey[200], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn={isNonMobile ? "span 4" : "span 12"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          borderRadius="4px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            // borderBottom={`2px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Response Time Trends
            </Typography>
          </Box>
          <Box
            sx={{
              padding: "1em",
            }}
          >
            <ResponseTimeTrends />
          </Box>
        </Box>

        <Box
          gridColumn={isNonMobile ? "span 4" : "span 12"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          borderRadius="4px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            // borderBottom={`2px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Bot Activity Breakdown
            </Typography>
          </Box>
          <Box>
            <BotActivityBreakDown />
          </Box>
        </Box>

        <Box
          gridColumn={isNonMobile ? "span 4" : "span 12"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          borderRadius="4px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            // borderBottom={`2px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Server Uptime & Response Time
            </Typography>
          </Box>
          <Box sx={{
            padding: '1em'
          }}>
            <ServerUptime />
          </Box>
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn={isNonMobile ? "span 6" : "span 12"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          // overflow="auto"
          borderRadius="4px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`2px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px 26px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Activities
            </Typography>
            <Typography color={colors.grey[100]} variant="h6" fontWeight="600">
              <Box
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    opacity: 0.5,
                    textDecoration: "underline",
                  },
                }}
              >
                View All Activities
              </Box>
            </Typography>
          </Box>
          <Box height="246px" overflow="auto" m="0 2px">
            {RecentActivityData.map((data, i) => (
              <Box
                key={`${data.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`2px solid ${colors.primary[400]}`}
                backgroundColor={colors.primary[500]}
                p="15px"
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: colors.primary[400],
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    gap: "1em",
                  }}
                >
                  <Typography
                    color={colors.grey[100]}
                    variant="h5"
                    fontSize={15}
                  >
                    <span style={{ fontWeight: "bold" }}>{data.txId}:</span>
                    <span> {data.botName}</span>
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="400"
                    color={colors.grey[300]}
                  >
                    {data.date} {data.time}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          gridColumn={isNonMobile ? "span 6" : "span 12"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          // overflow="auto"
          borderRadius="4px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`2px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px 26px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Quick Actions
            </Typography>
          </Box>
          <Box height="246px" overflow="auto" m="0 2px">
            <Typography
              borderBottom={`2px solid ${colors.primary[400]}`}
              backgroundColor={colors.primary[500]}
              p="15px"
              color={colors.grey[100]}
              variant="h5"
              fontSize={15}
              fontWeight="bold"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: colors.primary[400],
                  textDecoration: "underline",
                },
              }}
            >
              Create New Bot
            </Typography>
            <Typography
              borderBottom={`2px solid ${colors.primary[400]}`}
              backgroundColor={colors.primary[500]}
              p="15px"
              color={colors.grey[100]}
              variant="h5"
              fontSize={15}
              fontWeight="bold"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: colors.primary[400],
                  textDecoration: "underline",
                },
              }}
            >
              Add News Client
            </Typography>
            <Typography
              borderBottom={`2px solid ${colors.primary[400]}`}
              backgroundColor={colors.primary[500]}
              p="15px"
              color={colors.grey[100]}
              variant="h5"
              fontSize={15}
              fontWeight="bold"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: colors.primary[400],
                  textDecoration: "underline",
                },
              }}
            >
              View Reports
            </Typography>
            <Typography
              borderBottom={`2px solid ${colors.primary[400]}`}
              backgroundColor={colors.primary[500]}
              p="15px"
              color={colors.grey[100]}
              variant="h5"
              fontSize={15}
              fontWeight="bold"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: colors.primary[400],
                  textDecoration: "underline",
                },
              }}
            >
              Open Support Ticket
            </Typography>
          </Box>
        </Box>

        {/* ROW 4 */}
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
              Active Clients
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
              rows={ActiveClients}
              columns={ActiveClientsColumn}
              getRowId={(row) => row.id}
              onSelectionModelChange={handleCheckboxChange}
              rowHeight={40}
              headerHeight={40}
            />
          </Box>
        </Box>

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
              Active Bots
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
              rows={ActiveBots}
              columns={ActiveBotsColumn}
              getRowId={(row) => row.id}
              onSelectionModelChange={handleCheckboxChange}
              rowHeight={40}
              headerHeight={40}
            />
          </Box>
        </Box>
        {/* ROW 5 */}
      </Box>
    </Box>
  );
};

export default Dashboard;
