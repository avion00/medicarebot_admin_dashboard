import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@mui/material";
import BotActivityBreakDownData from "../data/botActivityBreakDownData";
import { tokens } from "../theme";
const BotComponentBreakDown = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div style={{ height: "220px" }}>
      <ResponsivePie
        data={BotActivityBreakDownData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        sortByValue={true}
        fit={false}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "accent" }}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabel="value"
        arcLinkLabelsTextOffset={16}
        arcLinkLabelsTextColor={colors.grey[100]}
        arcLinkLabelsDiagonalLength={0}
        arcLinkLabelsStraightLength={7}
        arcLinkLabelsThickness={10}
        arcLinkLabelsColor={{ from: "color", modifiers: [] }}
        enableArcLabels={false}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ theme: "background" }}
        defs={[
          {
            id: "dots",
            background: "red",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "solid",
            background: "red",
            color: "rgba(5, 5, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "ruby",
            },
            id: "dots",
          },
          {
            match: {
              id: "c",
            },
            id: "dots",
          },
          {
            match: {
              id: "go",
            },
            id: "dots",
          },
          {
            match: {
              id: "python",
            },
            id: "dots",
          },
          {
            match: {
              id: "scala",
            },
            id: "lines",
          },
          {
            match: {
              id: "lisp",
            },
            id: "lines",
          },
          {
            match: {
              id: "elixir",
            },
            id: "lines",
          },
          {
            match: {
              id: "javascript",
            },
            id: "lines",
          },
        ]}
        motionConfig={{
          mass: 1,
          tension: 32,
          friction: 6,
          clamp: false,
          precision: 0.01,
          velocity: 0,
        }}
        transitionMode="pushIn"
        legends={[]}
      />
    </div>
  );
};

export default BotComponentBreakDown;
