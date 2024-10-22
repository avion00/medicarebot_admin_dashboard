import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
// import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import PaymentIcon from '@mui/icons-material/Payment';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import ReviewsIcon from '@mui/icons-material/Reviews';
import PasswordIcon from '@mui/icons-material/Password';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        position: 'sticky', // Keeps the sidebar fixed
        top: 0, // Sticks it to the top
        height: '100vh', // Takes full viewport height
        overflowY: 'auto', // Scrollable when content overflows
        background: colors.primary[400], // Ensures background color
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
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
                <Typography variant="h3" color={colors.grey[100]} style={{
                  fontWeight: "700"
                }}>
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
                  johndeo_232
                </Typography>
                <Typography variant="h6" color={colors.blueAccent[300]}>
                  online
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {/* <Item
              title="Medicare Admin"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "12px 0 5px 20px" }}
            >
              Admin Dashboard
            </Typography>
            <Item
              title="Dashboard Overview"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SubMenu
              title="Client Management"
              icon={<ManageAccountsIcon />}
              active={selected === "support"}
              style={{
                color: colors.grey[100]
              }}
            >
              <MenuItem
                icon={<PersonIcon />}
                sx={{
                  "&:hover": {
                    color: "#868dfb !important",
                  },
                  "&.active": {
                    color: "#6870fa !important",
                  },
                }}
                onClick={() => setSelected("Client Profile")}
                
              style={{
                marginLeft: '-6px',
                fontSize: '14px'
              }}
              >
                <Link to="/clientProfile" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Client Profile
                </Link>
              </MenuItem>

              <MenuItem
                icon={<SmartToyIcon />}
                sx={{
                  "&:hover": {
                    color: "#868dfb !important",
                  },
                  "&.active": {
                    color: "#6870fa !important",
                  }
                }}
                onClick={() => setSelected("Assign Bot")}
                style={{
                marginLeft: '-6px',
                fontSize: '14px'
              }}
              >
                <Link to="/assignBot" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Assign Bot
                </Link>
              </MenuItem>
              <MenuItem
                icon={<AccountBalanceIcon />}
                sx={{
                  "&:hover": {
                    color: "#868dfb !important",
                  },
                  "&.active": {
                    color: "#6870fa !important",
                  }
                }}
                onClick={() => setSelected("Account")}
                style={{
                marginLeft: '-6px',
                fontSize: '14px'
              }}
              >
                <Link to="/account" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Account
                </Link>
              </MenuItem>
              
            </SubMenu>

            <Item
              title="Client Mangement"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Bot Management"
              to="/invoices"
              icon={<PrecisionManufacturingIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Billing Management"
              to="/invoices"
              icon={<PaymentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Support and Ticketing"
              to="/invoices"
              icon={<HelpCenterIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Review and Analysis"
              to="/invoices"
              icon={<ReviewsIcon />}
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
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Change Password"
              to="/form"
              icon={<PasswordIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Settings"
              to="/form"
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
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