import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

const CustomListItem = ({ to, icon, primary, open }: any) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleItemClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <ListItem
      disablePadding
      sx={{
        display: "block",
        "&:hover": { backgroundColor: "#151928" },
        // backgroundColor: isSelected ? "#151928" : "transparent",
      }}
    >
      <Link to={to} style={{ textDecoration: "none" }}>
        <ListItemButton
          onClick={handleItemClick}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
            color: "#fff",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText primary={primary} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default CustomListItem;
