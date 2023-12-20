import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import {
  Avatar,
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import { CSSObject, Theme, styled } from "@mui/material/styles";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/icons/EmartLogo.png";
import CustomListItem from "../components/lists/CustomListItem";
import Breadcrumbs from "./Breadcrumbs";
import CategoryIcon from "@mui/icons-material/Category";
import LayoutRoutes from "./AdminLayoutRoutes";

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("xs")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.up("md")
  );

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("loggedUserData");
    const parsedUserData = JSON.parse(storedUserData as string);
    setProfilePhoto(parsedUserData?.profilePhoto);
    console.log("profilePhoto", profilePhoto);
  }, [profilePhoto]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#fff" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 1,
                color: "#777",
              }}
            >
              <MenuIcon />
            </IconButton>
            {isLargeScreen ? (
              <Breadcrumbs />
            ) : (
              <Button
                type="button"
                color="primary"
                sx={{ p: 0 }}
                onClick={() => navigate(-1)}
                startIcon={<KeyboardArrowLeftIcon />}
              >
                Back
              </Button>
            )}
          </Box>
          <Avatar
            src={`data:image/png;base64,${profilePhoto}`}
            onClick={handleClick}
            sx={{ cursor: "pointer" }}
          />
        </Toolbar>
      </AppBar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => navigate("/admin/profile")}>
          <ListItemIcon>
            <ManageAccountsIcon />
          </ListItemIcon>
          Edit Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/");
            sessionStorage.clear();
          }}
        >
          <ListItemIcon sx={{ fontSize: "5px !important" }}>
            <LogoutIcon />
          </ListItemIcon>
          Signout
        </MenuItem>
      </Menu>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          whiteSpace: "nowrap",
        }}
      >
        <DrawerHeader>
          <img
            src={logo}
            alt="logo"
            width={"90px"}
            style={{ marginRight: "50px" }}
          />
        </DrawerHeader>
        <Divider />
        <List>
          <CustomListItem
            to="/admin/"
            icon={<DashboardIcon />}
            primary="Dashboard"
            open={open}
          />
          <CustomListItem
            to="/admin/admins"
            icon={<PersonIcon />}
            primary="Admins"
            open={open}
          />
          <CustomListItem
            to="/admin/products"
            icon={<InventoryIcon />}
            primary="Products"
            open={open}
          />
          <CustomListItem
            to="/admin/categories"
            icon={<CategoryIcon />}
            primary="Categories"
            open={open}
          />
          <CustomListItem
            to="/admin/users"
            icon={<PersonIcon />}
            primary="Customers"
            open={open}
          />
          <Divider sx={{ borderColor: "rgba(0, 0, 0, 0.12)" }} />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          height: "100%",
          backgroundColor: "#eee",
          minHeight: "100vh",
          overflow: "auto",
        }}
      >
        <DrawerHeader />
        <LayoutRoutes />
      </Box>
    </Box>
  );
}
