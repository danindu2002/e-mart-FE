import {
  Backdrop,
  Box,
  Chip,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import DashboardCard from "../../../components/cards/DashboardCard";
import BarChart from "../../../components/charts/BarChart";
import PieChart from "../../../components/charts/PieChart";
import DataTable from "../../../components/tables/DataTable";
import axios from "../../../api/apiConfig";
import { Context } from "../../../App";

interface OriginalData {
  checkoutId: number;
  user: {
    profilePhoto: string;
    firstName: string;
  };
  checkoutDate: string;
  total: number;
}

interface TransformedData {
  checkoutId: number;
  // profilePhoto: string;
  firstName: string;
  checkoutDate: string;
  total: number;
}

export default function Dashboard() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDrop, setOpenDrop] = useState<boolean>(false);
  const [customerCount, setCustomerCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [table, setTable] = useState<any[]>([]);
  const { userId } = useContext(Context);

  useEffect(() => {
    console.log("Context userId: ", userId);
  }, [userId]);

  function fetchCustomerCount() {
    axios
      .get(`/dashboard/customer-count/${userId}`)
      .then((response) => {
        console.log("customer-count", response.data.object);
        setCustomerCount(response.data.object);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchAdminCount() {
    axios
      .get(`/dashboard/admin-count/${userId}`)
      .then((response) => {
        console.log("admin-count", response.data.object);
        setAdminCount(response.data.object);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchCategoryCount() {
    axios
      .get(`/dashboard/category-count/${userId}`)
      .then((response) => {
        console.log("category-count", response.data.object);
        setCategoryCount(response.data.object);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchOrderCount() {
    axios
      .get(`/dashboard/order-count/${userId}`)
      .then((response) => {
        console.log("order-count", response.data.object);
        setOrderCount(response.data.object);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchTableData() {
    axios
      .get(`/dashboard/checkout/${userId}`)
      .then((response) => {
        console.log("tableData", response.data.object);
        let data = response.data.object;
        const formatData: TransformedData[] = data.map((item: any) => {
          return {
            userId: item.userId,
            email: item.email,
            contactNo: item.contactNo,
            firstName: item.firstName,
            total: (
              <Chip
                label={item.total.toFixed(2)}
                color="primary"
                // variant="outlined"
              />
            ),
          };
        });
        console.log("formData", formatData);
        setTable(formatData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetchCustomerCount();
    fetchAdminCount();
    fetchCategoryCount();
    fetchOrderCount();
    fetchTableData();
  }, []);

  const tableHeaders = [
    "User Id",
    "Email",
    "Contact",
    "First Name",
    "Total (Rs.)",
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
              value={customerCount}
              imageSrc={require("../../../assets/images/attendee.png")}
              altText="Events"
              title="Total Customers"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              value={adminCount}
              imageSrc={require("../../../assets/images/admin.png")}
              altText="Sessions"
              title="Total Admin Accounts"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              value={categoryCount}
              imageSrc={require("../../../assets/images/session.png")}
              altText="Attendees"
              title="Total Categories"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              value={orderCount}
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
              overflow: "auto",
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
          Top Customers
        </Typography>
        <Box sx={{ mx: 3 }}>
          <DataTable
            data={table}
            columns={tableHeaders}
            page={page}
            rowsPerPage={rowsPerPage}
            count={table.length}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            noDataMessage="No Checkout Details Available"
          />
        </Box>
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
