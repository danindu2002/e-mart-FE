import * as React from "react";
import { BarChart, axisClasses } from "@mui/x-charts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";

const dataset = [
  {
    value: 9,
    month: "Jan",
  },
  {
    value: 1,
    month: "Feb",
  },
  {
    value: 7,
    month: "Mar",
  },
  {
    value: 4,
    month: "Apr",
  },
  {
    value: 7,
    month: "May",
  },
  {
    value: 8,
    month: "June",
  },
  {
    value: 9,
    month: "July",
  },
  {
    value: 5,
    month: "Aug",
  },
  {
    value: 1,
    month: "Sept",
  },
  {
    value: 2,
    month: "Oct",
  },
  {
    value: 7,
    month: "Nov",
  },
  {
    value: 1,
    month: "Dec",
  },
];

const valueFormatter = (value: number) => `${value}`;

export default function Chart() {
  const barColor = "#409AE9";
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const chartSetting = {
    yAxis: [
      {
        label: "",
      },
    ],
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };

  const series = [
    { dataKey: "value", label: "Monthly Income", valueFormatter },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "auto",
        width: "100%",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mt: "15px" }}>
        Monthly Income of Products
      </Typography>
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: "band", dataKey: "month" }]}
        series={series}
        colors={[barColor]}
        width={isSmallScreen ? 350 : 600}
        height={isSmallScreen ? 240 : 300}
        {...chartSetting}
      />
    </Box>
  );
}
