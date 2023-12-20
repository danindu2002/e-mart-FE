import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Divider, Rating } from "@mui/material";
import ProductImage from "../../assets/images/headphones.jpg";
import { useNavigate } from "react-router-dom";

interface CardProps {
  id: number;
  name: string;
  description: string;
  rating: number;
  price: number;
}

export default function ProductCard({
  name,
  rating,
  price,
  description,
}: CardProps) {
  return (
    <Card
      sx={{
        maxWidth: 230,
        m: 2,
        maxHeight: 400,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="auto"
          image={ProductImage}
          alt="product image"
        />
        <Divider />
        <CardContent>
          <Typography
            component="div"
            sx={{
              fontSize: "19px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Typography>
          <Rating
            name="rating"
            value={rating / 2}
            precision={0.5}
            readOnly
            sx={{ fontSize: "1.2rem" }}
          />
          <Typography
            component="div"
            sx={{
              fontSize: "14px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {description}
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: "18px" }}>
            Rs. {price.toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
