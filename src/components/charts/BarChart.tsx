import * as React from "react";
import { BarChart, axisClasses } from "@mui/x-charts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../../api/apiConfig";

const valueFormatter = (value: number) => `${value}`;

export default function Chart() {
  const [dataset, setDataset] = useState<any[]>([{}]);
  const barColor = "#ff8a14";
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  function fetchBarChartData() {
    axios
      .get("/dashboard/monthly-income")
      .then((response) => {
        console.log("monthly-income", response);
        setDataset(response.data.object);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

  useEffect(() => {
    fetchBarChartData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "auto",
        width: "100%",
        mx:2,
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
