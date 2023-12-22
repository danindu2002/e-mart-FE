import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListIcon from "@mui/icons-material/List";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import logo from "../../assets/icons/EmartLogo.png";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  InputAdornment,
  IconButton,
  Badge,
  useMediaQuery,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { toast } from "react-toastify";
import axios from "../../api/apiConfig";
import { Context } from "../../App";

export default function TopBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [categoryMenu, setCategoryMenu] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const isScreenMd = useMediaQuery("(max-width:1020px)");
  const isScreenSm = useMediaQuery("(max-width:600px)");
  const { cartProducts, setSearchTerm, setSelectedCategory } =
    useContext(Context);

  const handleCategoryMenuClick = (event: any) => {
    setCategoryMenu(event.currentTarget);
  };

  const handleCategoryMenuClose = () => {
    setCategoryMenu(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    fetchCategories();
    const storedUserData = sessionStorage.getItem("loggedUserData");
    const parsedUserData = JSON.parse(storedUserData as string);
    setProfilePhoto(parsedUserData?.profilePhoto);
    console.log("profilePhoto", profilePhoto);
  }, [profilePhoto]);

  const fetchCategories = () => {
    axios
      .get("/categories/")
      .then((response) => {
        console.log(response.data.responseList);
        setCategories(response.data.responseList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCategoryClick = async (refCategoryId: any) => {
    setSelectedCategory(refCategoryId);
    navigate("/user/");
  };

  const handleSearchBar = async () => {
    setSearchTerm(searchKeyword);
    navigate("/user/");
    console.log("search keyword", searchKeyword);
  };

  const handleClearSearch = async () => {
    setSearchTerm("");
    setSearchKeyword("");
    console.log("search keyword", searchKeyword);
  };

  return (
    <Box
      position="fixed"
      width="100%"
      zIndex={1000}
      top="0"
      sx={{
        pb: 2,
        backgroundColor: "#fff",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-evenly"
          marginTop={1}
          sx={{ flexWrap: "nowrap" }}
        >
          <Grid item>
            <img
              src={logo}
              alt="logo"
              width={isScreenSm ? "80px" : "120px"}
              onClick={() => navigate("/user/")}
              style={{ cursor: "pointer" }}
            />
          </Grid>

          <Grid item sx={{ display: isScreenSm ? "none" : "block" }}>
            <Button
              type="button"
              variant="contained"
              color="info"
              sx={{
                textTransform: "capitalize",
                backgroundColor: "#EDA90E",
                color: "#fff",
              }}
              onClick={handleCategoryMenuClick}
              startIcon={<ListIcon />}
            >
              {isScreenMd ? "Categories" : "Browse Categories"}
            </Button>
            <Menu
              anchorEl={categoryMenu}
              open={Boolean(categoryMenu)}
              onClose={handleCategoryMenuClose}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category.refCategoryId}
                  value={category.refCategoryId}
                  onClick={() => handleCategoryClick(category.refCategoryId)}
                >
                  {category.refCategoryName}
                </MenuItem>
              ))}
            </Menu>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              variant="outlined"
              placeholder="Search Products..."
              size="small"
              fullWidth
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e?.target?.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearchBar} edge="end">
                      <SearchIcon />
                    </IconButton>
                    {searchKeyword && (
                      <IconButton onClick={handleClearSearch} edge="end">
                        <ClearIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item>
            <Button
              type="button"
              sx={{
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "#555",
                minWidth: "5px",
              }}
              onClick={() => navigate("/user/cart")}
            >
              <Badge badgeContent={cartProducts} color="info">
                <ShoppingCartIcon sx={{ height: 30, width: 30 }} />
              </Badge>
              {!isScreenSm && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    ml: 1.2,
                  }}
                >
                  <Typography variant="body1">Cart</Typography>
                </Box>
              )}
            </Button>
          </Grid>

          <Grid item>
            <Avatar
              src={`data:image/png;base64,${profilePhoto}`}
              onClick={handleClick}
              sx={{ cursor: "pointer" }}
            />
          </Grid>
          <br />
        </Grid>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => navigate("/user/profile")}>
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
      </Container>
    </Box>
  );
}
