import React from "react";
import { ResponsiveRadar } from "@nivo/radar";

const RadarChart = ({ data }) => {
  console.log("RadarChart us data:", data); // Debugging data

  return (
    <ResponsiveRadar
      data={data}
      keys={["chardonay", "carmenere", "syrah"]}
      indexBy="taste"
      valueFormat=" >-.2f"
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      curve="catmullRomClosed"
      borderWidth={1}
      borderColor="#0209d4"
      gridLabelOffset={12}
      dotSize={9}
      dotColor="#030ea0"
      dotBorderWidth={1}
      dotBorderColor={{ from: "color", modifiers: [] }}
      colors={{ scheme: "tableau10" }}
      fillOpacity={0.5}
      blendMode="multiply"
      motionConfig="wobbly"
      legends={[
        {
          anchor: "top-left",
          direction: "column",
          translateX: -50,
          translateY: -40,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: "#999",
          symbolSize: 12,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default RadarChart;
