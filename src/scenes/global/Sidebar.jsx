import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import PaymentIcon from "@mui/icons-material/Payment";
import useMediaQuery from "@mui/material/useMediaQuery";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PasswordIcon from "@mui/icons-material/Password";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: selected === title ? "#6870fa" : colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
    const isNonMobile = useMediaQuery("(min-width:768px)");


  // Check if the URL path matches any menu item title
  const updateSelected = (title) => {
    if (location.pathname.includes(title.toLowerCase())) {
      setSelected(title);
    }
  };

  return (
    <Box
      sx={{
        position: isNonMobile ? "sticky" : "fixed",
        top: 0,
        left: 0,
        width: isCollapsed ? "80px" : "270px",
        height: "100vh",
        zIndex: isNonMobile ? 1 : 1000,
        overflowY: "auto",
        transition: "width 0.3s ease",

        "& .pro-sidebar-inner": {
          backgroundColor: colors.primary[400],
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        "& .pro-sub-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  style={{
                    fontWeight: "700",
                  }}
                >
                  MEDICAREBOT
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  John Doe
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[300]}>
                  johndoe_232
                </Typography>
                <Typography variant="h6" color={colors.blueAccent[300]}>
                  online
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{
                margin: isCollapsed ? 0 : "12px 0 5px 20px",
                textAlign: isCollapsed ? "center" : "left",
              }}
            >
              Admin Dashboard
            </Typography>
            <Item
              title="Dashboard Overview"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SubMenu
              title="Client Management"
              icon={<ManageAccountsIcon />}
              active={["Client Profile", "Assign Bot", "Account"].includes(
                selected
              )}
              style={{
                color: colors.grey[100],
                "& .pro-menu-item.active": {
                  color: "#6870fa !important",
                },
                "& .pro-sub-menu-item.active": {
                  color: "#6870fa !important",
                },
                "& .pro-inner-item:focus": {
                  // color: 'red',
                },
                // .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item:focus
              }}
            >
              <MenuItem
                icon={<PersonIcon />}
                onClick={() => {
                  setSelected("Client Profile");
                  updateSelected("clientProfile");
                }}
                style={{
                  color:
                    selected === "Client Profile"
                      ? "#6870fa"
                      : colors.grey[100],
                }}
              >
                <Link
                  to="/clientProfile"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    fontSize: "13px",
                  }}
                >
                  Client Profile
                </Link>
              </MenuItem>

              <MenuItem
                icon={<SmartToyIcon />}
                onClick={() => {
                  setSelected("Assign Bot");
                  updateSelected("assignBot");
                }}
                style={{
                  color:
                    selected === "Assign Bot" ? "#6870fa" : colors.grey[100],
                }}
              >
                <Link
                  to="/assignBot"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    fontSize: "13px",
                  }}
                >
                  Assign Bot
                </Link>
              </MenuItem>
              <MenuItem
                icon={<AccountBalanceIcon />}
                onClick={() => {
                  setSelected("Account");
                  updateSelected("account");
                }}
                style={{
                  color: selected === "Account" ? "#6870fa" : colors.grey[100],
                }}
              >
                <Link
                  to="/account"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    fontSize: "13px",
                  }}
                >
                  Account
                </Link>
              </MenuItem>
            </SubMenu>
            <Item
              title="Bot Management"
              to="/bot"
              icon={<PrecisionManufacturingIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Billing Management"
              to="/billing"
              icon={<PaymentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Support and Ticketing"
              to="/support"
              icon={<HelpCenterIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Reports and Analysis"
              to="/reports"
              icon={<AssessmentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Profile
            </Typography>
            <Item
              title="Edit Profile"
              to="/editProfile"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Change Password"
              to="/changePassword"
              icon={<PasswordIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
