import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import axios from "../../api/apiConfig";
import { useLayoutEffect, useState } from "react";

interface PieChartProps {
  pastEvents: number;
  futureEvents: number;
}

const data = [
  { id: 0, value: 10, label: "Electronics" },
  { id: 1, value: 15, label: "Fashion" },
  { id: 4, value: 12, label: "Tools" },
  { id: 5, value: 8, label: "Garden" },
];

export default function Chart({ pastEvents, futureEvents }: PieChartProps) {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const chartWidth = isSmallScreen ? 320 : 390;
  const chartHeight = isSmallScreen ? 170 : 200;
  const height = isSmallScreen ? 280 : 320;
  const [data, setData] = useState<any>([]);

  const fetchPieChartData = () => {
    axios
      .get("/dashboard/category-product-count")
      .then((response) => {
        console.log("pieChartData", response.data.object);
        setData(response.data.object);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useLayoutEffect(() => {
    fetchPieChartData();
  }, []);

  return (
    <Stack direction="row" textAlign="center" spacing={2}>
      <Box flexGrow={1} sx={{ height: { height }, backgroundColor: "#fff" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: "15px" }}>
          Product Count in Categories
        </Typography>
        <PieChart
          series={[
            {
              data,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
              innerRadius: 40,
              outerRadius: 100,
              paddingAngle: 3,
              cornerRadius: 5,
            },
          ]}
          width={chartWidth}
          height={chartHeight}
        />
      </Box>
    </Stack>
  );
}
