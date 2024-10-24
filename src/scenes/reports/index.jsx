import { React, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import jsonData from "../../data/reportsData.json";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

function Reports() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filter data based on selected date range
  const filterDataByDate = (allData, filterStartDate, filterEndDate) => {
    if (!filterStartDate || !filterEndDate) return allData;
    const start = new Date(filterStartDate);
    const end = new Date(filterEndDate);
    return allData.filter((item) => {
      const date = new Date(item.day);
      return date >= start && date <= end;
    });
  };

  // Generate report when date range is selected
  const generateReport = () => {
    const filteredPerformanceData = filterDataByDate(
      jsonData.performanceData,
      startDate,
      endDate
    );
    const filteredActivityData = filterDataByDate(
      jsonData.activityData,
      startDate,
      endDate
    );
    return { filteredPerformanceData, filteredActivityData };
  };

  const { filteredPerformanceData, filteredActivityData } = generateReport();

  // Pie chart data for Conversation Success Rate and Client Satisfaction
  const successRateData = [
    { id: "Success", label: "Success", value: jsonData.successRate },
    { id: "Failure", label: "Failure", value: 100 - jsonData.successRate },
  ];

  const satisfactionData = [
    {
      id: "Satisfied",
      label: "Satisfied",
      value: jsonData.clientSatisfaction,
    },
    {
      id: "Unsatisfied",
      label: "Unsatisfied",
      value: 100 - jsonData.clientSatisfaction,
    },
  ];

  return (
    <Box m="20px">
      <Box>
        <Header
          title="Reports and Analysis"
          subtitle="Welcome to your Medicare Bot Reports and Analysis Dashboard"
        />
      </Box>
      <Box>
        <div
          className="date-range"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1em",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Box>
            <label
              htmlFor="startDate"
              style={{
                fontWeight: "600",
                marginRight: ".5em",
              }}
            >
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                fontFamily: "Inter",
                padding: ".75em 1.2em",
                borderRadius: ".25em",
                border: "1px solid rgb(125, 125, 125, .5)",
                backgroundColor: colors.blueAccent[900],
                color: "inherit",
                cursor: 'pointer'
              }}
              onFocus={(e) => {
                e.target.style.outline = `1px solid ${colors.blueAccent[600]}`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "none";
                e.target.style.outline = "none";
              }}
            />
          </Box>
          <Box>
            <label
              htmlFor="endDate"
              style={{
                fontWeight: "600",
                marginRight: ".5em",
              }}
            >
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                fontFamily: "Inter",
                padding: ".75em 1.2em",
                borderRadius: ".25em",
                border: "1px solid rgb(125, 125, 125, .5)",
                backgroundColor: colors.blueAccent[900],
                color: "inherit",
                cursor: 'pointer'
              }}
              onFocus={(e) => {
                e.target.style.outline = `1px solid ${colors.blueAccent[600]}`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "none";
                e.target.style.outline = "none";
              }}
            />
          </Box>
        </div>

        <div className="report-section">
          <Box mt="2em">
            <Header title="Performance Report" />
          </Box>
          <Box
            className="graph"
            style={{
              height: "300px",
              // border: '1px solid red',
              backgroundColor: colors.primary[400],
              padding: "2em 0 1em 0",
            }}
          >
            <ResponsiveBar
              data={filteredPerformanceData}
              keys={["value"]}
              indexBy="day"
              margin={{
                top: 10,
                right: 30,
                bottom: 50,
                left: 60,
              }}
              padding={0.3}
              colors={{ scheme: "nivo" }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Date",
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Performance",
                legendPosition: "middle",
                legendOffset: -40,
              }}
              enableLabel={false}
              theme={{
                axis: {
                  ticks: {
                    text: {
                      fill: colors.primary[100],
                      fontSize: 12,
                      fontWeight: 600,
                      fontFamily: "Inter",
                    },
                  },
                  legend: {
                    text: {
                      fill: colors.primary[100],
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: "Inter",
                    },
                  },
                },
                legends: {
                  text: {
                    fill: colors.primary[100],
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: "Inter",
                  },
                },
              }}
            />
          </Box>
        </div>

        <div className="activity-section">
          <Box mt="2em">
            <Header title="Client Activity" />
          </Box>
          <div
            className="graph"
            style={{
              height: "300px",
              backgroundColor: colors.primary[400],
              padding: "2em 0 1em 0",
            }}
          >
            <ResponsiveLine
              data={[
                {
                  id: "Clients",
                  data: filteredActivityData.map((item) => ({
                    x: item.day,
                    y: item.clients,
                  })),
                },
              ]}
              margin={{
                top: 10,
                right: 30,
                bottom: 50,
                left: 60,
              }}
              xScale={{ type: "point" }}
              yScale={{ type: "linear", min: 0, max: "auto" }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Date",
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Client Activity",
                legendPosition: "middle",
                legendOffset: -40,
              }}
              pointSize={10}
              enableGridX
              enableGridY
              theme={{
                axis: {
                  ticks: {
                    text: {
                      fill: colors.primary[100],
                      fontSize: 12,
                      fontWeight: 600,
                      fontFamily: "Inter",
                    },
                  },
                  legend: {
                    text: {
                      fill: colors.primary[100],
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: "Inter",
                    },
                  },
                },
                legends: {
                  text: {
                    fill: colors.primary[100],
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: "Inter",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="analytics-section">
          <Box mt="2em">
            <Header title="Analytics Tools" />
          </Box>
          <div
            className="analytics-cards"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "1em",
              justifyContent: "space-between",
            }}
          >
            <div
              className="card"
              style={{
                height: "300px",
                width: "42%",
                minWidth: "300px",
                flexGrow: 1,
                alignContent: "center",
                textAlign: "center",
                boxShadow: `2px 2px 300px 5px ${colors.primary[400]} inset`,
              }}
            >
              <h3
                style={{
                  fontSize: "1em",
                  fontWeight: "700",
                  marginBottom: "2em",
                }}
              >
                Conversation Success Rate
              </h3>
              <div
                style={{
                  height: "200px",
                }}
              >
                <ResponsivePie
                  data={successRateData}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                  innerRadius={0.6}
                  padAngle={0.7}
                  cornerRadius={3}
                  activeOuterRadiusOffset={8}
                  colors={{ scheme: "nivo" }}
                  borderWidth={1}
                  borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.2]],
                  }}
                  theme={{
                    labels: {
                      text: {
                        fill: colors.primary[100],
                        fontSize: 14,
                        fontWeight: 600,
                        fontFamily: "Inter",
                      },
                    },
                    legends: {
                      text: {
                        fill: colors.primary[100],
                        fontSize: 14,
                        fontWeight: 600,
                        fontFamily: "Inter",
                      },
                    },
                  }}
                />
              </div>
            </div>

            <div
              className="card"
              style={{
                height: "300px",
                width: "42%",
                minWidth: "300px",
                flexGrow: 1,
                alignContent: "center",
                textAlign: "center",
                boxShadow: `2px 2px 300px 5px ${colors.primary[400]} inset`,
              }}
            >
              <h3
                style={{
                  fontSize: "1em",
                  fontWeight: "600",
                  marginBottom: "2em",
                }}
              >
                Client Satisfaction
              </h3>
              <div
                style={{
                  height: "200px",
                }}
              >
                <ResponsivePie
                  data={satisfactionData}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                  innerRadius={0.6}
                  padAngle={0.7}
                  cornerRadius={3}
                  activeOuterRadiusOffset={8}
                  colors={{ scheme: "nivo" }}
                  borderWidth={1}
                  borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.2]],
                  }}
                  theme={{
                    labels: {
                      text: {
                        fill: colors.primary[100],
                        fontSize: 14,
                        fontWeight: 600,
                        fontFamily: "Inter",
                      },
                    },
                    legends: {
                      text: {
                        fill: colors.primary[100],
                        fontSize: 14,
                        fontWeight: 600,
                        fontFamily: "Inter",
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
}

export default Reports;
