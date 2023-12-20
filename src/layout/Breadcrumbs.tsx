import { Box, Link as Link } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { Breadcrumbs as MUIBreadcrumbs } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function Breadcrumbs() {
  const location = useLocation();
  console.info(location);

  let currentLink = "";

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, index, array) => {
      currentLink += `/${crumb}`;
      const isLastCrumb = index === array.length - 1;
      const id = /^\d+$/.test(crumb);

      if (isLastCrumb && id) {
        return null;
      }

      const Crumb =
        crumb.replace("-", " ").charAt(0).toUpperCase() +
        crumb.replace("-", " ").slice(1);

      return (
        <div key={Crumb}>
          <Link
            href={currentLink}
            sx={{
              textDecoration: "none",
              color: "inherit",
              "&:hover": {
                textDecoration: "underline",
                color: "#222",
              },
            }}
          >
            {Crumb === "Admin" ? (
              <HomeIcon sx={{ mt: 0.4 }} />
            ) : Crumb === "Users" ? (
              "Customers"
            ) : (
              Crumb
            )}
          </Link>
        </div>
      );
    })
    .filter(Boolean);

  return (
    <MUIBreadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {crumbs}
    </MUIBreadcrumbs>
  );
}
