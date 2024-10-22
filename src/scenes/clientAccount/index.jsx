import React, { useState, useEffect } from "react";
import Account from "../../data/userAccount.json";
import { Box, Button, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
const AccountManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    setUsers(Account);
  }, []);

  const toggleFreeze = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          return { ...user, frozen: !user.frozen };
        }
        return user;
      })
    );
  };

  // Handle selecting a user
  const handleSelectUser = (userId) => {
    const user = users.find((u) => u.id === userId);
    setSelectedUser(user);
    setShowDetail(true); // Show the details dialog when a user is selected
  };

  // Close the detail dialog
  const closeDialog = () => {
    setShowDetail(false); // Hide the details dialog
  };

  // Render each user
  const renderUserList = () =>
    users.map((user) => (
      <div
        key={user.id}
        className="userAccount"
        style={{
          border: "1px solid rgb(125, 125, 125, 0.2)",
          padding: "1.5em",
          backgroundColor: colors.primary[400],
          width: "400px",
          flexGrow: 1,
          opacity: user.frozen ? 0.5 : 1, // Change opacity if account is frozen
        }}
      >
        <p style={{ fontWeight: "600" }}>
          <span style={{ fontWeight: "600" }}> Username: </span>
          <span style={{ fontSize: "1.25em", color: colors.greenAccent[300] }}>
            {user.username}
          </span>
        </p>
        <p>
          <span style={{ fontWeight: "600" }}> Email: </span>
          {user.email}
        </p>
        <p>
          <span style={{ fontWeight: "600" }}> Status: </span>
          {user.frozen ? "Frozen" : "Active"}
        </p>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1em",
          }}
        >
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "12px",
              fontWeight: "bold",
              padding: "8px 14px",
            }}
            onClick={() => handleSelectUser(user.id)}
          >
            <ViewStreamIcon sx={{ mr: "8px" }} />
            View Details
          </Button>
          <Button
            sx={{
              backgroundColor: user.frozen
                ? colors.greenAccent[500]
                : colors.redAccent[500],
              color: colors.grey[100],
              fontSize: "12px",
              fontWeight: "bold",
              padding: "8px 14px",
            }}
            onClick={() => toggleFreeze(user.id)}
          >
            <AcUnitIcon sx={{ mr: "8px" }} />
            {user.frozen ? "Unfreeze Account" : "Freeze Account"}
          </Button>
        </Box>
      </div>
    ));

  return (
    <Box style={{ position: "relative" }}>
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
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>
      <div
        className="client_management_board"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1em",
          justifyContent: "center",
          maxWidth: showDetail ? "68%" : "100%",
          transition: "max-width 0.3s ease",
        }}
      >
        {renderUserList()}
      </div>
      {showDetail && selectedUser && (
        <div
          className="detail_dialoug_box"
          style={{
            position: "absolute",
            top: "7em",
            right: "1em",
            padding: "1em",
            backgroundColor: colors.primary[400],
            minWidth: "30%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 style={{margin: '0 !important '}}>User Details</h2>
            <Box>
              <Button
                className="close-icon"
                onClick={closeDialog}
                sx={{
                  height: "44px !important",
                  width: "44px !important",
                  fontSize: '55px',
                  color: colors.grey[100],
                }}
              >
                <HighlightOffRoundedIcon />
              </Button>
            </Box>
          </div>
          <p>
            <strong>Username:</strong> {selectedUser.username}
          </p>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <p>
            <strong>Address:</strong> {selectedUser.address}
          </p>
          <p>
            <strong>Contact:</strong> {selectedUser.contact}
          </p>
          <p>
            <strong>Date of Birth:</strong> {selectedUser.dob}
          </p>
          <p>
            <strong>Status:</strong> {selectedUser.frozen ? "Frozen" : "Active"}
          </p>
        </div>
      )}
    </Box>
  );
};

export default AccountManagement;
