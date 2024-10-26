import React, { useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { tokens } from "../theme";

const ProfileCard = ({ client, onEdit, onDelete, onSuspend }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSuspended, setIsSuspended] = useState(false);

  const toggleSuspend = () => {
    setIsSuspended(!isSuspended);
    onSuspend(client.username);
  };

  return (
    <Box
      className="profile-card"
      style={{
        paddingBottom: "1em",
        backgroundColor: colors.primary[400],
      }}
    >
      <Box
        className="profile-header"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <img
          src={client.profileImage || `../../assets/user.png`}
          alt="Profile"
          className="profile-image"
          style={{
            width: "120px",
            height: "120px",
            objectFit: "cover",
            margin: "1em 2em",
            borderRadius: "50%",
            opacity: isSuspended ? ".4" : "1",
            cursor: "pointer",
            border: "1px solid rgb(125, 125, 125, .3)",
          }}
        />
        <Box
          className="profile-info-header"
          style={{ width: "400px", padding: "1em" }}
        >
          <h2
            style={{
              fontSize: "1.75em",
              fontFamily: "Rubik, sans-serif",
              fontWeight: "600",
              textTransform: "capitalize",
              margin: "0",
              color: "inherit",
              opacity: isSuspended ? ".4" : "1",
            }}
          >
            {client.name || "No Full Name"}
          </h2>
          <p
            style={{
              fontSize: "1.12em",
              fontFamily: "Rubik, sans-serif",
              fontWeight: "400",
              margin: "0 0 0 .5em",
              opacity: isSuspended ? ".4" : "1",
            }}
          >
            @ {client.username || "No username"}
          </p>
        </Box>
        <Box
          className="profile-info"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "16px",
            flexGrow: "1",
            marginRight: "5em",
            padding: "1em 1.5em",
            width: "400px",
            lineHeight: "2",
          }}
        >
          <Box className="profile-row">
            <span
              className="label"
              style={{
                opacity: isSuspended ? ".4" : "1",
                fontWeight: "800",
                fontSize: "14px",
                color: colors.blueAccent[300],
              }}
            >
              Email:{" "}
            </span>
            <span
              className="value"
              style={{ opacity: isSuspended ? ".4" : "1" }}
            >
              {client.email || "No Email"}
            </span>
          </Box>
          <Box className="profile-row">
            <span
              className="label"
              style={{
                opacity: isSuspended ? ".4" : "1",
                fontWeight: "800",
                fontSize: "14px",
                color: colors.blueAccent[300],
              }}
            >
              Address:{" "}
            </span>
            <span
              className="value"
              style={{ opacity: isSuspended ? ".4" : "1" }}
            >
              {client.address || "No Address"}
            </span>
          </Box>
          <Box className="profile-row">
            <span
              className="label"
              style={{
                opacity: isSuspended ? ".4" : "1",
                fontWeight: "800",
                fontSize: "14px",
                color: colors.blueAccent[300],
              }}
            >
              Contact No:{" "}
            </span>
            <span
              className="value"
              style={{ opacity: isSuspended ? ".4" : "1" }}
            >
              {client.contact || "No Contact number"}
            </span>
          </Box>
          <Box className="profile-row">
            <span
              className="label"
              style={{
                opacity: isSuspended ? ".4" : "1",
                fontWeight: "800",
                fontSize: "14px",
                color: colors.blueAccent[300],
              }}
            >
              DOB:{" "}
            </span>
            <span
              className="value"
              style={{ opacity: isSuspended ? ".4" : "1" }}
            >
              {client.dob || "No DOB"}
            </span>
          </Box>
        </Box>
      </Box>

      <Box
        className="action-buttons"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "1em",
          marginLeft: "1em",
        }}
      >
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: ".5em 1em",
            textTransform: "capitalize",
          }}
          onClick={() => onEdit(client.username)}
        >
          <EditIcon sx={{ mr: "10px" }} />
          Edit
        </Button>
        <Button
          sx={{
            backgroundColor: colors.redAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: ".5em 1em",
            textTransform: "capitalize",
          }}
          onClick={() => onDelete(client.username)}
        >
          <DeleteForeverIcon sx={{ mr: ".5em" }} />
          Delete
        </Button>
        <Button
          sx={{
            backgroundColor: colors.grey[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: ".5em 1em",
            textTransform: "capitalize",
          }}
          onClick={toggleSuspend}
        >
          <AcUnitIcon sx={{ mr: ".5em" }} />
          {isSuspended ? "Unsuspend" : "Suspend"}
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileCard;
