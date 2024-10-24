import React from "react";
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../theme";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

// DropdownMenu component
const DropdownMenu = ({ items }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Define icons for each item
  const icons = {
    "View Profile": <AccountCircleIcon sx={{ marginRight: "8px" }} />,
    "Edit Profile": <EditIcon sx={{ marginRight: "8px" }} />,
    "Log out": <ExitToAppIcon sx={{ marginRight: "8px" }} />,
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "3em",
        right: ".5em",
        border: `1px solid ${colors.grey[700]}`,
        borderRadius: ".5em",
        background: colors.primary[400],
        boxShadow: `0px 4px 15px rgba(0, 0, 0, 0.1)`,
        zIndex: 11000,
        overflow: "hidden",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          padding: "0",
          margin: "0",
          width: "220px",
        }}
      >
        {items.map((item, index) => (
          <li
            key={index}
            style={{
              borderBottom:
                index < items.length - 1
                  ? `1px solid ${colors.grey[700]}`
                  : "none",
              padding: ".75em 1.5em",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              boxSizing: "border-box",
              transition: "background-color 0.3s ease, color 0.3s ease",
              color: item === "Log out" ? colors.redAccent[500] : "inherit",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor =
                item === "Log out" ? "rgba(255, 0, 0, 0.1)" : colors.grey[900];
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
            }}
          >
            {icons[item]} {/* Display the corresponding icon */}
            <Typography variant="body2">{item}</Typography> {/* Item text */}
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default DropdownMenu;
