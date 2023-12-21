import {
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DashboardCard from "../../../components/cards/DashboardCard";
import BarChart from "../../../components/charts/BarChart";
import PieChart from "../../../components/charts/PieChart";
import DataTable from "../../../components/tables/DataTable";

export default function Dashboard() {
  const [events, setEvent] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDrop, setOpenDrop] = useState<boolean>(false);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const tableHeaders = [
    "#",
    "Profile Photo",
    "Quantity",
    "First Name",
    "Date",
    "Total",
  ];

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", ml: 1.5, color: "#444" }}
      >
        Dashboard
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              value={0}
              imageSrc={require("../../../assets/images/attendee.png")}
              altText="Events"
              title="Total Customers"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              value={0}
              imageSrc={require("../../../assets/images/admin.png")}
              altText="Sessions"
              title="Total Admin Accounts"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              value={0}
              imageSrc={require("../../../assets/images/session.png")}
              altText="Attendees"
              title="Total Categories"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              value={0}
              imageSrc={require("../../../assets/images/registration.png")}
              altText="Registrations"
              title="Today Orders"
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px",
          "@media (max-width: 900px)": {
            flexDirection: "column",
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            boxShadow: "3px 3px 8px rgb(172, 177, 179)",
            borderRadius: "5px",
            width: "58%",
            "@media (max-width: 900px)": {
              width: "100%",
            },
          }}
        >
          <BarChart />
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            p: "13px 0px",
            boxShadow: "3px 3px 8px rgb(172, 177, 179)",
            borderRadius: "5px",
            width: "40%",
            "@media (max-width: 900px)": {
              width: "100%",
              p: "13px 0px",
              m: "13px 0px",
              overflow: "auto",
            },
          }}
        >
          <PieChart pastEvents={5} futureEvents={5} />
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: "3px 3px 8px rgb(172, 177, 179)",
          borderRadius: "5px",
          m: "20px 10px",
          width: "98%",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "center", pt: 2 }}
        >
          Checkout Details
        </Typography>
        <DataTable
          data={events}
          columns={tableHeaders}
          page={page}
          rowsPerPage={rowsPerPage}
          count={events.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          noDataMessage="No Checkout Details Available"
        />
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
