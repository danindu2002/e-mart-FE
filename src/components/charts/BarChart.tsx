import { BarChart, axisClasses } from "@mui/x-charts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import axios from "../../api/apiConfig";
import { Context } from "../../App";

const valueFormatter = (value: number) => `${value}`;

export default function Chart() {
  const [dataset, setDataset] = useState<any[]>([{}]);
  const [yAxisFormat, setYAxisFormat] = useState("");
  const barColor = "#ff8a14";
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const { userId } = useContext(Context);

  function fetchBarChartData() {
    axios
      .get(`/dashboard/monthly-income/${userId}`)
      .then((response) => {
        console.log("monthly-income", response);
        console.log("bar chart", response.data.object);
        const data = response.data.object;
        data.map((item: any, index: any) => {
          if (data[index].value >= 10000) {
            console.log("greater 1K", (data[index].value = item.value / 1000));
            setYAxisFormat("x 1K");
          } else if (data[index].value >= 100000) {
            console.log(
              "greater 10K",
              (data[index].value = item.value / 10000)
            );
            setYAxisFormat("x 10K");
          } else if (data[index].value >= 1000000) {
            console.log(
              "greater 100K",
              (data[index].value = item.value / 100000)
            );
            setYAxisFormat("x 100K");
          }
        });
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
    {
      dataKey: "value",
      label: `Monthly Income(${yAxisFormat})`,
      valueFormatter,
    },
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
        overflow: isSmallScreen ? "scroll" : "none",
        width: "100%",
        mx: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mt: "15px" }}>
        Monthly Income of Products
      </Typography>
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: "band", dataKey: "month" }]}
        // <yAxis tickFormatter={(value) => `${value / 1000}k`} />
        series={series}
        colors={[barColor]}
        width={isSmallScreen ? 350 : 600}
        height={isSmallScreen ? 240 : 300}
        {...chartSetting}
      />
    </Box>
  );
}
