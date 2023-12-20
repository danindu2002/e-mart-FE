import React, { useState } from "react";
import { Grid, Box, IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function ImageSlider({ images }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <Grid item xs={12} md={6}>
      <Box
        component="div"
        sx={{
          width: "80%",
          height: "70vh",
          background: `url(${images[currentIndex]})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          border: "1px solid #aaa",
          position: "relative",
          borderRadius: "10px",
          marginLeft: "auto",
        }}
      >
        <IconButton
          onClick={handlePrevClick}
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <img
          src={images[currentIndex]}
          alt={`Product ${currentIndex + 1}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: "10px",
          }}
        />
        <IconButton
          onClick={handleNextClick}
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
    </Grid>
  );
}
