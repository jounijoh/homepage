import {
  Container,
  ImageList,
  ImageListItem,
  useMediaQuery,
  Dialog,
  Box,
  ImageListItemBar,
  IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";

export default function GalleryWithData() {
  const [photos, setPhotos] = useState([
    {
      title: "",
      description: "",
      camera: {},
      film: {},
      phographer: {},
      src: "",
      cols: null,
      rows: null,
    },
  ]);
  const [photo, setPhoto] = useState({
    title: "",
    description: "",
    camera: "",
    film: "",
    phographer: "",
    src: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:8080/getphotos")
      .then((response) => {
        if (response.ok) return response.json();
        else alert("something went wrong while fetching data");
      })
      .then((data) => {
        setPhotos(
          data.map((photo) => {
            let cols = null;
            let rows = null;
            if (photo.camera.filmFormat === "Medium format") {
              cols = 2;
              rows = 4;
            }
            return {
              title: photo.title,
              description: photo.description,
              camera: photo.camera,
              film: photo.film,
              photograher: photo.user,
              src: process.env.PUBLIC_URL + photo.filePath,
              cols: cols,
              rows: rows,
            };
          })
        );
      });
  };

  /// OPEN IMAGE
  const [open, setOpen] = useState(false);
  //const theme = useTheme();
  //const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (item) => {
    setPhoto({
      title: item.title,
      description: item.description,
      camera: item.camera.name,
      film: item.film.name,
      format: item.camera.format,
      src: item.src,
    });
    setOpen(true);
  };

  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  console.log(photos);
  return (
    <>
      <Container maxWidth="md">
        <h1>My photo gallery with metadata</h1>
        <h4>All photos are taken on film by me</h4>
      </Container>
      <Container maxWidth="xl">
        <ImageList
          variant="masonry"
          gap={15}
          sx={{
            columnCount: {
              xs: "1 !important",
              sm: "2 !important",
              md: "3 !important",
              lg: "4 !important",
              xl: "4 !important",
            },
          }}
        >
          {photos.map((item) => (
            <ImageListItem
              key={item.src}
              cols={item.cols || 1}
              rows={item.rows || 3}
            >
              <img
                {...srcset(item.src, 121, item.rows, item.cols)}
                alt={item.description}
                loading="lazy"
                onClick={(event) => handleClick(item)}
              />
              <ImageListItemBar
                position="below"
                title={item.title}
                subtitle={`Film: ${item.film.name} | Camera: ${item.camera.name}`}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
      <Dialog
        maxWidth={"xl"}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <img
          style={{ maxWidth: "auto", height: "80%" }}
          src={photo.src}
          alt={photo.description || "not found"}
        />
      </Dialog>
    </>
  );
}
