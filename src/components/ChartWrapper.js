import React from "react";
import ChartComponent from "./ChartComponent";
import { useSelector } from "react-redux";

export default function ChartWrapper({ percentile }) {
  var chartInfo = useSelector((state) => state.modalReducer.ChartInfo);
  //   const productName = useSelector(state => state.modalReducer.productName);
  //   const percentile = useSelector(state => state.modalReducer.percentile);
  //   console.log(JSON.parse(chartInfo));
  chartInfo = JSON.parse(chartInfo);

  let min = 100;
  for (let item of chartInfo) {
    if (item.Yield < min) min = item.Yield;
  }

  const aDays = chartInfo.filter((item) => {
    return item.Month.length > 7;
  });
  const aMonths = chartInfo.filter((item) => {
    return item.Month.length === 7;
  });
  //console.log(aDays);
  //console.log(aMonths);

  const monthsData = [
    {
      id: "months",
      color: "#b71c1c",
      data: aMonths.map((item) => {
        return {
          x: item.Month + "_" + "_" + item.Count + "_" + item.Yield,
          y: item.Yield,
        };
      }),
    },
  ];

  //   console.log(monthsData);

  const daysData = [
    {
      id: "days",
      color: "#03a9f4",
      data: aDays.map((item) => {
        return {
          x: item.Month + "_" + item.Count + "_" + item.Yield,
          y: item.Yield,
        };
      }),
    },
  ];
  //   console.log(daysData);

  let minYeild = percentile < min ? percentile - 5 : min - 5;

  return (
    <div>
      <div className="halfModal-left">
        <h6>Per Month</h6>
        <ChartComponent
          data={monthsData}
          percentile={percentile}
          min={minYeild}
        />
      </div>
      <div className="halfModal-right">
        <h6>Per Lot, Last Month</h6>
        <ChartComponent
          data={daysData}
          percentile={percentile}
          min={minYeild}
        />
      </div>
    </div>
  );
}
