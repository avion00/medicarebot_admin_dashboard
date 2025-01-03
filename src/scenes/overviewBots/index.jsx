import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

const OverviewBots = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");

  

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

        

        

        
      </Box>
    </Box>
  );
};

export default OverviewBots;
