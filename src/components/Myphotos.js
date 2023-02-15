import React from "react";
import { useState, useEffect } from "react";
import { storage } from "./Firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

export default function MyPhotos() {
  const [itemData, setItemData] = useState([]);
  useEffect(() => {
    setItemData([]);
    const imageListRef = ref(storage, "myPhotos/");
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setItemData((prev) => [...prev, { img: url, title: "title" }]);
        });
      });
    });
  }, []);

  /// OPEN IMAGE
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [url, setUrl] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (event, url) => {
    setUrl(url);
    setOpen(true);
  };

  return (
    <>
      <Container fluid="md">
        <h1>My photo gallery</h1>
        <h4>All photos are taken on film by me</h4>
        <Box sx={{ width: '100%', height: 1000, border: '2px solid #000', overflowY: "scroll" }}>
          <ImageList variant="masonry" sx={{
    columnCount: {
      xs: '1 !important',
      sm: '2 !important',
      md: '3 !important',
      lg: '4 !important',
      xl: '4 !important',
    },
  }}>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                  onClick={(event) => handleClick(event, item.img)}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Container>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      >
        <img
          style={{ maxWidth: "100%", height: "auto" }}
          src={url}
          alt="not found"
        />
      </Dialog>
    </>
  );
}
