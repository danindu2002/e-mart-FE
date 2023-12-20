import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

/**
 * A button component used in edit, update and delete action buttons in tables
 * *props used to customize the action button
 * @title - Title for the action button tooltip.
 * @to - Optional URL to navigate to when the button is clicked.
 * @icon - Icon or content for the action button.
 * @onClick - Optional callback function when the button is clicked.
 */

interface ActionButtonProps {
  title: string;
  to?: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

function ActionButton({ title, to, icon, onClick }: ActionButtonProps) {
  return (
    <Tooltip title={title} arrow>
      {to ? (
        <Link to={to}>
          <IconButton
            sx={{
              p: 0,
              pr: "8px",
              "&:hover": {
                color: "#000",
              },
            }}
            onClick={onClick}
          >
            {icon}
          </IconButton>
        </Link>
      ) : (
        <IconButton
          sx={{
            p: 0,
            pr: "8px",
            "&:hover": {
              color: "#000",
            },
          }}
          onClick={onClick}
        >
          {icon}
        </IconButton>
      )}
    </Tooltip>
  );
}

export default ActionButton;
