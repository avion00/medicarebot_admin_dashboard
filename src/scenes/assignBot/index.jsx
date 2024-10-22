import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { BotAssign } from "../../data/botAssign";
import { ClientActivity } from "../../data/clientActivity";


import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import Header from "../../components/Header";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        alignItems="center"
      >
        <Header
          title="ASSIGN BOT AND CLIENT ACTIVITY"
          subtitle="Assign bots to clients and viewed detailed client activity reports"
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

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 2 */}
        <Box
          gridColumn="span 6"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`5px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Bot Assigned
            </Typography>
          </Box>
          {BotAssign.map((assign, i) => (
            <Box
              key={`${assign.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`5px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box display="flex" alignItems="center" gap="1em">
                <Box height="40px" width="40px">
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: "1px solid",
                      borderColor: "rgb(125, 125, 125, 0.3)",
                    }}
                    src={`../../assets/user.png`}
                    alt="logo"
                  />
                </Box>
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {assign.txId}
                  </Typography>
                  <Typography color={colors.grey[100]} variant="h6">
                    {assign.user}
                  </Typography>
                </Box>
              </Box>

              <Box
                backgroundColor={colors.blueAccent[500]}
                p="5px 16px"
                borderRadius="4px"
              >
                {assign.bot} bot
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          gridColumn="span 6"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Client Activities
            </Typography>
          </Box>
          {ClientActivity.map((activities, i) => (
            <Box
              key={`${activities.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {activities.txId}
                </Typography>
                <Typography
                  color={colors.blueAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {activities.btId}
                </Typography>
              </Box>

              <Box>
                <Box fontSize="12px">{activities.date}</Box>
                <Box fontSize="12px" color={colors.blueAccent[400]}>
                  {activities.time} min ago
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  fontSize: "12px",
                  maxWidth: "150px",
                  height: "40px",
                  lineHeight: '1.2',
                  overflow: "hidden",
                }}
              >
                {activities.activity}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
