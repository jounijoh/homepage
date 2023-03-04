import React, { useState} from "react";
import { ImageList, ImageListItem, ImageListItemBar, IconButton, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Photograph } from "../types/Photograph";
import Dialog from "@mui/material/Dialog/Dialog";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

interface Props {
  photos: Photograph[]
}

export default function PhotoGrid({ photos }: Props) {
  const [photo, setPhoto] = useState<Photograph>()
  const [open, setOpen] = useState(false);
  const handleClick = (photo: Photograph) => {
    setPhoto(photo);
    setOpen(true);
  };
    // OPEN/CLOSE IMAGE IN MODAL (DIALOG)
  // FULL SCREEN WHEN SCREEN SIZE IS XS
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  //const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
        <ImageListItem key={item.title}>
          <img
            src={`${item.filePath}?w=248&fit=crop&auto=format`}
            srcSet={`${item.filePath}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={"Error, not found"}
            loading="lazy"
            onClick={(event) => handleClick(item)}
          />
          <ImageListItemBar
            position="below"
            title={item.title}
            actionIcon={
              <Tooltip
                title={
                  <>
                    <Typography>{`Photo by: ${item.user.firstname} ${item.user.lastname}`}</Typography>
                    <Typography>{`Camera: ${item.camera.name}`}</Typography>
                    <Typography>{`Film: ${item.film.name} ${item.film.type}`}</Typography>
                  </>
                }
                placement="top-end"
              >
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
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