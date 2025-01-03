// Import required dependencies
import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import ResponseTimeTrendsData from "../data/responseTimeTrendsData"

// Line chart component
const ResponseTimeTrends = () => {
  const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <div style={{ height: "220px" }}>
      <ResponsiveLine
        data={ResponseTimeTrendsData}
        margin={{ top: 10, right: 10, bottom: 50, left: 40 }}
        xScale={{ type: "point" }}
        enableGridX={false}
        enableGridY={false}
        isInteractive={false}
        enablePointLabel={false}
        pointLabelYOffset={-15}
        enableArea={false}
        xFormat=" >-"
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -90,
          legend: "transportation",
          legendOffset: 36,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        colors={{ scheme: "category10" }}
        lineWidth={1}
        pointSize={8}
        pointColor={{ from: "color", modifiers: [] }}
        pointBorderWidth={0}
        pointBorderColor={{ theme: "labels.text.fill" }}
        enableTouchCrosshair={true}
        useMesh={true}
        // legends={[]}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: colors.primary[100],
                fontSize: 8,
                fontWeight: 600,
                fontFamily: "Inter",
              },
            },
            legend: {
              text: {
                fill: colors.primary[100],
                fontSize: 14,
                fontWeight: "normal",
                fontFamily: "Inter",
                display: "none",
              },
            },
          },
          legends: {
            text: {
              fill: colors.primary[100],
              fontSize: 14,
              fontWeight: "normal",
              fontFamily: "Inter",
              display: "none",
            },
          },
        }}
      />
    </div>
  );
};

export default ResponseTimeTrends;
