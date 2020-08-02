import { ResponsiveLine } from "@nivo/line";
import React from "react";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const ChartComponent = ({ data, percentile, min }) => {
  const CustomSymbol = ({ size, color, borderWidth, borderColor }) => (
    <g>
      <circle
        fill="#fff"
        r={size / 2}
        strokeWidth={borderWidth}
        stroke={borderColor}
      />
      <circle
        r={size / 5}
        strokeWidth={borderWidth}
        stroke={borderColor}
        fill={color}
        fillOpacity={0.35}
      />
    </g>
  );

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 20, right: 60, bottom: 100, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: min,
        max: "100",
        stacked: false,
        reverse: false
      }}
      //costum tooltip!
      xFormat={value => {
        var arr = value.split("_");
        return arr[1] ? (
          <strong>
            Lot: {arr[1]} Count: {arr[2]}
          </strong>
        ) : (
          <strong>Count: {arr[2]}</strong>
        );
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 45,
        //costum x bar
        format: value => {
          var arr = value.split("_");
          return `${arr[0]}`;
        }
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 10,
        tickRotation: 0,
        legend: "Yield",
        legendOffset: -40,
        legendPosition: "middle"
      }}
      markers={[
        {
          axis: "y",
          value: percentile,
          lineStyle: { stroke: "#000", strokeWidth: 0.1 },
          legend: "Maverick: " + percentile,
          legendOrientation: "horizontal"
        }
      ]}
      pointSize={14}
      pointBorderWidth={1}
      pointBorderColor={{
        from: "color",
        modifiers: [["darker", 0.3]]
      }}
      useMesh={true}
      enableArea={true}
      areaBaselineValue={percentile}
      enablePointLabel={true}
      pointLabelYOffset={-20}
      areaOpacity={0.07}
      pointSymbol={CustomSymbol}
      colors={{ datum: "color" }}></ResponsiveLine>
  );
};

export default ChartComponent;
