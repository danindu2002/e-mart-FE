import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import noPreview from "../../assets/images/no-preview.jpg";
import { CardActionArea, Divider, Rating } from "@mui/material";
import axios from "../../api/apiConfig";
import { useEffect, useState } from "react";

interface CardProps {
  id: number;
  name: string;
  description: string;
  rating: number;
  price: number;
}

export default function ProductCard({
  id,
  name,
  rating,
  price,
  description,
}: CardProps) {
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    fetchProductImages();
  }, [id]);

  const fetchProductImages = async () => {
    try {
      const response = await axios.get(`/images/all-images?productId=${id}`);
      console.log("product images:", response.data.responseList);

      const decodedImages = response.data.responseList.map(
        (imageObject: any) => {
          const { imageName, image } = imageObject;
          const decodedImage = decodeBase64Image(image);
          return { imageName, decodedImage };
        }
      );
      setImage(decodedImages);
    } catch (error) {
      console.log(error);
    }
  };

  const decodeBase64Image = (base64String: string) => {
    try {
      const byteCharacters = atob(base64String);
      const byteArray = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
      }
      return URL.createObjectURL(new Blob([byteArray]));
    } catch (error) {
      console.error("Error decoding base64 image:", error);
      return null;
    }
  };

  return (
    <Card
      sx={{
        m: 2,
        width: 230,
        height: 360,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="230"
          image={image && image.length > 0 ? image[0].decodedImage : noPreview}
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
