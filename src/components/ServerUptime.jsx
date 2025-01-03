import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import ServerUptimeData from "../data/serverUptimeData";
const ServerUptime = () => {
  return (
    <div style={{ height: "220px" }}>
      <ResponsiveBar
        data={ServerUptimeData}
        keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
        indexBy="country"
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        padding={0.01}
        groupMode="grouped"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: false }}
        colors={{ scheme: "blues" }}
        defs={[
          {
            id: "dots",
            type: "solid",
            background: "inherit",
            color: "red",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "solid",
            background: "red",
            color: "#red",
            rotation: -45,
            lineWidth: 6,
            spacing: 20,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}
        borderRadius={2}
        borderColor="#ac3939"
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        enableGridX={false}
        enableGridY={false}
        enableTotals={false}
        totalsOffset={6}
        labelSkipWidth={0}
        labelSkipHeight={0}
        labelTextColor="black"
        labelPosition="end"
        labelOffset={10}
        legends={[]}
        isInteractive={false}
        motionConfig="molasses"
        role="application"
        isFocusable={true}
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          e.id + ": " + e.formattedValue + " in country: " + e.indexValue
        }
      />
    </div>
  );
};

export default ServerUptime;
