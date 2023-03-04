import React from "react";
import { useState, useEffect } from "react";
import { storage } from "../components/Firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "react-uuid";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Container from "@mui/material/Container";

// SIMPLE PAGE WHERE ANYONE CAN UPLOAD PHOTO 

function ImageGallery() {
  const [imgUpload, setImgUpload] = useState(null);
  const [imgList, setImgList] = useState([]);

  // IMG UPLOAD
  const uploadImage = () => {
    if (imgUpload == null) return alert("Error loading image");

    const imageRef = ref(storage, `yourImages/${imgUpload.name + v4}`);
    uploadBytes(imageRef, imgUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImgList((prev) => [...prev, { img: url, title: "title" }]);
        alert("Image uploaded!");
      });
    });
  };
  // FETCH FIREBASE FILES

  useEffect(() => {
    const imageListRef = ref(storage, "yourImages/");
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImgList((prev) => [...prev, { img: url, title: "title" }]);
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
    <div>
      <Container fluid="md">
        <h1>Welcome to photodump!</h1>
        <h4>Feel free to share your pictures here!</h4>
        <p>Remember that you cant delete them after loading</p>
        <div>
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={(e) => {
              setImgUpload(e.target.files[0]);
            }}
          />
          <button id="uploadButton" onClick={uploadImage}>
            Upload to page
          </button>
        </div>
        <br />
        <Box sx={{ width: "100%", height: 1000, overflowY: "scroll" }}>
          <ImageList
            variant="masonry"
            sx={{
              columnCount: {
                xs: "1 !important",
                sm: "2 !important",
                md: "3 !important",
                lg: "4 !important",
                xl: "4 !important",
              },
              gap: "3",
            }}
          >
            {imgList.map((item) => (
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
    </div>
  );
}

export default ImageGallery;
