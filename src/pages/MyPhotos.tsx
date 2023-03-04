import {
  Container,
  ImageList,
  ImageListItem,
  Dialog,
  ImageListItemBar,
  IconButton,
  Typography,
  Tooltip,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Fade
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import React, { useState, useEffect, Fragment } from "react";
import { Photograph } from "../types/Photograph";
import { ref, set, getDatabase, onValue } from "firebase/database";
import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage";



export default function GalleryWithData() {
  const [photos, setPhotos] = useState<Photograph[]>([]);
  const [photo, setPhoto] = useState<Photograph>()
  // CONNECTION TO FIREBASE
  const db = getDatabase();
  const storage = getStorage();
  const fbRef = ref(db, 'photodata');
  // LOADING ICON WHILE FETCHING DATA
  const [loading, setLoading] = useState(false);

  // GET DATA FROM LOCAL DB WITH RESTFUL API 
  const fetchData = () => {
    // START LOADING ICON
    if (photos.length === 0) {
      setLoading(true);
    }
    fetch("http://localhost:8080/getphotos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        return response.json();
      })
      // CHANGE FILEPATH OF PHOTOS INTO FIREBASE URL
      .then(async (data) => {
        const promises = data.map((photo: Photograph) =>
          getDownloadURL(storageRef(storage, photo.filePath)).then((url) => {
            photo.filePath = url;
          })
        );
        // WAIT FOR ASYNC MAPPING TO FINISH
        await Promise.all(promises);
        return data;
      })
      // SET PHOTOS
      .then((data) => {
        setPhotos(data)
        return data
      })
      // AFTER SUCCESFUL FETCH FROM LOCAL DATABASE AND URL SETUP SET DATA AS BACKUP TO FIREBASE
      .then((data) => set(ref(db, 'photodata'), {
        body: data
      })
      )
      .catch(() => {
        //GET DATA FROM FIREBASE WHEN LOCAL SERVER IS NOT UP 
        console.log("Local Database sleepping, fetching data from firebase")
        getFireBaseData();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // FETCH THE DATA 
  useEffect(() => {
    fetchData();
  }, []);

  // GET DATA FROM FIREBASE
  const getFireBaseData = () => {
    onValue(fbRef, (snapshot) => {
      const response = snapshot.val();
      const data = response.body as Photograph[];
      setPhotos(data)
    });
  }

  // OPEN/CLOSE IMAGE IN MODAL (DIALOG)
  // FULL SCREEN WHEN SCREEN SIZE IS XS
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (photo: Photograph) => {
    setPhoto(photo);
    setOpen(true);
  };


  return (
    <>
      <Container maxWidth="md">
        <h1>My photo gallery</h1>
        <h4>All photos are taken on film by me</h4>
        <Fade
          // LOADING ICON AND TEXT WHILE FETCHING IMAGES
          in={loading}
          style={{
            transitionDelay: loading ? '300ms' : '0ms',
          }}
          unmountOnExit
        >
          <div>
            <CircularProgress color="inherit" />
            <p>Fetching images from the depths of Jounis slow but amazing Back-End-solutions</p>
            <p>Please wait...</p>
          </div>

        </Fade>

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
          {photos!.map((item) => (
            <ImageListItem
              // MAP PHOTOS USING MUI IMAGELIST 
              key={item.title}
            >
              <img
                src={`${item.filePath})}?w=248&fit=crop&auto=format`}
                srcSet={`${item.filePath}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={"Error, not found"}
                loading="lazy"
                onClick={(event) => handleClick(item)}
              />
              <ImageListItemBar
                position="below"
                title={item.title}
                actionIcon={
                  // TOOLTIP AS AN INFO WINDOW FOR IMAGE DATA
                  <Tooltip title={<Fragment>
                    <Typography>{`Photo by: ${item.user.firstname} ${item.user.lastname}`}</Typography>
                    <Typography>{`Camera: ${item.camera.name}`} </Typography>
                    <Typography>{`Film: ${item.film.name} ${item.film.type}`}</Typography>
                  </Fragment>}
                    placement="top-end">
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`info about ${item.title}`}
                    >
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
      <Dialog
        // MODAL WINDOW FOR OPENING IMAGES
        fullScreen={fullScreen}
        maxWidth={"xl"}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <img
          style={{ maxWidth: "90%", height: "auto", margin: "auto" }}
          src={photo?.filePath}
          alt={photo?.description || "not found"}
        />
        <Typography
          // SHOW FILM AND CAMERA USED BELOW OPENED IMAGE
          variant="h6"
          align="center"
        >{`Film: ${photo?.film.name || null} | Camera: ${photo?.camera.name || null}`}</Typography>
      </Dialog>
    </>
  );
}
