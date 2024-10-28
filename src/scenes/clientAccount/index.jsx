import React, { useState, useEffect } from "react";
import Account from "../../data/userAccount.json";
import { Box, Button, useTheme, IconButton, Typography } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

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
            onClick={() => handleSelectUser(user.id)}
            variant="outlined"
            sx={{
              color: colors.blueAccent[300],
              borderColor: colors.blueAccent[300],
              borderRadius: "20px",
              marginRight: "8px",
              "&:hover": {
                backgroundColor: colors.blueAccent[700],
                borderColor: colors.blueAccent[700],
              },
            }}
          >
            <ViewStreamIcon sx={{ mr: "8px" }} />
            View Details
          </Button>

          <Button
            onClick={() => toggleFreeze(user.id)}
            variant="outlined"
            sx={{
              color: colors.redAccent[300],
              borderColor: colors.redAccent[300],
              borderRadius: "20px",
              marginRight: "8px",
              "&:hover": {
                backgroundColor: colors.redAccent[700],
                borderColor: colors.redAccent[700],
              },
            }}
          >
            <AcUnitIcon sx={{ mr: "8px" }} />
            {user.frozen ? "Unfreeze Account" : "Freeze Account"}
          </Button>
        </Box>
      </div>
    ));

  return (
    <Box m="20px" style={{ position: "relative" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        alignItems="center"
      >
        <Header title="CLIENT ACCOUNT" subtitle="Manage your client accounts" />
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
        <Box
          open={showDetail && selectedUser}
          onClose={closeDialog}
          sx={{
            position: "absolute",
            top: "6.9em",
            right: "0",
            width: "30%",
            maxHeight: "84vh",
            overflow: 'auto',
          }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                padding: "1em",
                borderBottom: `4px solid ${colors.primary[500]}`,
                backgroundColor: colors.primary[400],
                width: "100%",
                color: colors.grey[100],
              }}
              variant="h4"
              component="span"
            >
              User Details
            </Typography>
            <IconButton
              onClick={closeDialog}
              size="small"
              sx={{
                position: "absolute",
                right: "1em",
              }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          <Box>
            <Box style={{ lineHeight: "1.6" }}>
              <Box
                sx={{
                  fontWeight: "700",
                  padding: "1em",
                  borderBottom: `4px solid ${colors.primary[500]}`,
                  backgroundColor: colors.primary[400],
                  width: "100%",
                  color: colors.grey[100],
                }}
              >
                <strong>Username:</strong> {selectedUser?.username}
              </Box>
              <Box
                sx={{
                  fontWeight: "700",
                  padding: "1em",
                  borderBottom: `4px solid ${colors.primary[500]}`,
                  backgroundColor: colors.primary[400],
                  width: "100%",
                  color: colors.grey[100],
                }}
              >
                <strong>Email:</strong> {selectedUser?.email}
              </Box>
              <Box
                sx={{
                  fontWeight: "700",
                  padding: "1em",
                  borderBottom: `4px solid ${colors.primary[500]}`,
                  backgroundColor: colors.primary[400],
                  width: "100%",
                  color: colors.grey[100],
                }}
              >
                <strong>Address:</strong> {selectedUser?.address}
              </Box>
              <Box
                sx={{
                  fontWeight: "700",
                  padding: "1em",
                  borderBottom: `4px solid ${colors.primary[500]}`,
                  backgroundColor: colors.primary[400],
                  width: "100%",
                  color: colors.grey[100],
                }}
              >
                <strong>Contact:</strong> {selectedUser?.contact}
              </Box>
              <Box
                sx={{
                  fontWeight: "700",
                  padding: "1em",
                  borderBottom: `4px solid ${colors.primary[500]}`,
                  backgroundColor: colors.primary[400],
                  width: "100%",
                  color: colors.grey[100],
                }}
              >
                <strong>Date of Birth:</strong> {selectedUser?.dob}
              </Box>
              <Box
                sx={{
                  fontWeight: "700",
                  padding: "1em",
                  borderBottom: `4px solid ${colors.primary[500]}`,
                  backgroundColor: colors.primary[400],
                  width: "100%",
                  color: colors.grey[100],
                }}
              >
                <strong>Status: </strong>
                <span style={{ color: selectedUser?.frozen ? "red" : "green" }}>
                  {selectedUser?.frozen ? "Frozen" : "Active"}
                </span>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AccountManagement;
