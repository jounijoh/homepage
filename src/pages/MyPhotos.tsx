import {
  Container,
  CircularProgress,
  Fade
} from "@mui/material";
import React, { useState, useEffect, Fragment } from "react";
import { Photograph } from "../types/Photograph";
import { ref, set, getDatabase, onValue } from "firebase/database";
import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage";
import PhotoGrid from "../components/PhotoGridComponent";



export default function GalleryWithData() {
  const [photos, setPhotos] = useState<Photograph[]>([]);
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
      
      <Container maxWidth="xl"
      >
        <PhotoGrid photos={photos} />
      </Container>
    </>
  );
}
