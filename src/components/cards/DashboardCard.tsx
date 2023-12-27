import { Card, CardContent, Grid, Typography, CardMedia } from "@mui/material";
import { title } from "process";
import React from "react";

interface CardProps {
  value: number;
  imageSrc: string;
  altText: string;
  title: string;
}

export default function DashboardCard({
  value,
  imageSrc,
  altText,
  title,
}: CardProps) {
  return (
    <Card
      sx={{
        minWidth: 200,
        m: "10px",
        boxShadow: "3px 3px 8px rgb(172, 177, 179)",
        borderRadius: "5px",
      }}
    >
      <CardContent>
        <Grid
          container
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Typography
              gutterBottom
              variant="h3"
              component="div"
              sx={{ fontWeight: "550" }}
            >
              {value}
            </Typography>
          </Grid>
          <Grid item>
            <CardMedia
              sx={{
                height: 70,
                width: 70,
              }}
              image={imageSrc}
              title={altText}
            />
          </Grid>
        </Grid>
        <Typography variant="body1" color="text.secondary">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
