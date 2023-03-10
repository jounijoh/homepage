import React, { useState } from "react";
import ControlledCarousel from "../components/CarouselComp";
import { Container } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { caddyUrl, crossroadsUrl } from "../urls/ImgUrls";


export default function HomePage() {

  // Open/Close images in Dialog 
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [url, setUrl] = useState("");
  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (event, src) => {
    setUrl(src);
    setOpen(true);
  };
  
  return (
    <>
      <br />
      <Container>
        <ControlledCarousel />

        <div className="flex_container">
          <div className="flex_item_txt" id="indexekatxt">
            <h2 id="info">How it started</h2>

            <p>
              My interest in photography rose to a new level in 2019, when me
              and my friends went on vacation to Cuba. My friend Janne persuaded
              me to get a film camera for the trip (Nikon L35AF) and to try film
              photography. I photographed over ten rolls of film on the trip and
              when I saw the pictures developed and scanned, I was hooked.
            </p>
          </div>
          <div className="flex_item_img" id="indeximg">
         
            <img src={caddyUrl}
            alt="Photograph inside an old Cadillac somewhere ni Cuba" 
            onClick={(e) => handleClick(e, caddyUrl)} />
            
          </div>
          <div className="flex_item_txt" id="indextokatxt">
            <p>
              It was incredible to see how great the pictures, a small, 30 years
              old plastic camera was able to achieve. My interest in film
              photographity grew quickly and soon I owned many different film
              cameras, as they were dirt cheap still at that time. The attached
              photo taken from inside of an old Cadillac in Cuba was one of the
              first film pictures I've ever shot, yet it still remains as one of
              my all time favourites.
            </p>
          </div>

          <div className="flex_item_img" id="indeximg2">
          <img src={crossroadsUrl}
            alt="Photograph from crossroad by the sea in Havana" 
            onClick={(e) => handleClick(e, crossroadsUrl)} />
          </div>
        </div>
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
