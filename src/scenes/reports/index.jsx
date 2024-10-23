import { React, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import jsonData from "../../data/reportsData.json";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function Reports() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDate, setSelectedDate] = React.useState(null);

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
          <label
            htmlFor="startDate"
            style={{
              fontWeight: "600",
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
              padding: ".5em 1em",
              borderRadius: ".25em",
              border: "1px solid rgb(125, 125, 125, .3)",
              backgroundColor: colors.blueAccent[900],
              color: "inherit",
            }}
            onFocus={(e) => {
              e.target.style.outline = `1px solid ${colors.blueAccent[600]}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "none";
              e.target.style.outline = "none";
            }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <label
            htmlFor="endDate"
            style={{
              fontWeight: "600",
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
              padding: ".5em 1em",
              borderRadius: ".25em",
              border: "1px solid rgb(125, 125, 125, .3)",
              backgroundColor: colors.blueAccent[900],
              color: "inherit",
            }}
            onFocus={(e) => {
              e.target.style.outline = `1px solid ${colors.blueAccent[600]}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "none";
              e.target.style.outline = "none";
            }}
          />
        </div>

        <div className="report-section">
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              padding: ".65em 1em",
              backgroundColor: "rgb(1, 150, 220, 0.1)",
              borderRadius: ".25em",
              margin: "2em .75em",
            }}
          >
            Performance Report
          </h2>
          <div
            className="graph"
            style={{
              height: "300px",
              padding: "1em",
              margin: "1em",
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
                      fill: "text.primary",
                      fontSize: 12,
                      fontFamily: "Rubik, sans-serif",
                    },
                  },
                  legend: {
                    text: {
                      fill: "text.primary",
                      fontSize: 14,
                      fontWeight: "500",
                      fontFamily: "Rubik, sans-serif",
                    },
                  },
                },
                legends: {
                  text: {
                    fill: "text.primary",
                    fontFamily: "Rubik, sans-serif",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="activity-section">
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              padding: ".65em 1em",
              backgroundColor: "rgb(1, 150, 220, 0.1)",
              borderRadius: ".25em",
              margin: "2em .75em",
            }}
          >
            Client Activity
          </h2>
          <div
            className="graph"
            style={{
              height: "300px",
              padding: "1em",
              margin: "1em",
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
                      fill: "text.primary",
                      fontSize: 12,
                      fontFamily: "Rubik, sans-serif",
                    },
                  },
                  legend: {
                    text: {
                      fill: "text.primary",
                      fontSize: 14,
                      fontWeight: "500",
                      fontFamily: "Rubik, sans-serif",
                    },
                  },
                },
                legends: {
                  text: {
                    fill: "text.primary",
                    fontFamily: "Rubik, sans-serif",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="analytics-section">
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              padding: ".65em 1em",
              backgroundColor: "rgb(1, 150, 220, 0.1)",
              borderRadius: ".25em",
              margin: "2em .75em",
            }}
          >
            Analytics Tools
          </h2>
          <div
            className="analytics-cards"
            style={{
              margin: "1em",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "1em",
              justifyContent: "space-around",
            }}
          >
            <div
              className="card"
              style={{
                padding: "1em",
                height: "300px",
                width: "42%",
                minWidth: "300px",
                flexGrow: 1,
                alignContent: "center",
                textAlign: "center",
                boxShadow: "2px 2px 300px 5px rgb(1, 150, 220, .25) inset",
                borderRadius: ".5em",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
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
                        fontSize: 12,
                        fill: "text.primary",
                        fontFamily: "Rubik, sans-serif",
                      },
                    },
                    legends: {
                      text: {
                        fill: "text.primary",
                        fontFamily: "Rubik, sans-serif",
                      },
                    },
                  }}
                />
              </div>
            </div>

            <div
              className="card"
              style={{
                padding: "1em",
                height: "300px",
                width: "42%",
                minWidth: "300px",
                flexGrow: 1,
                alignContent: "center",
                textAlign: "center",
                boxShadow: "2px 2px 300px 5px rgb(1, 150, 220, .25) inset",
                borderRadius: ".5em",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
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
                        fontSize: 12,
                        fill: "text.primary",
                        fontFamily: "Rubik, sans-serif",
                      },
                    },
                    legends: {
                      text: {
                        fill: "text.primary",
                        fontFamily: "Rubik, sans-serif",
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
