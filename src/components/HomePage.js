import React from "react";
import ControlledCarousel from "./CarouselComp";
import { Container } from "@mui/system";

export default function HomePage() {
  
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
            <img
              className="cadilac"
              src="https://firebasestorage.googleapis.com/v0/b/digitekniikatlopputyo.appspot.com/o/frontPageImages%2Fkuuba2.jpg?alt=media&token=62ee175f-a50f-49bc-be00-7e28bbf586c5"
              alt="Kuva vanhan cadilacin sisältä kuuban rannikolta"
              width="800"
            />
          </div>
          <div className="flex_item_txt" id="indextokatxt">
            <p>
              It was incredible to see how great the pictures, a small, 30 years
              old plastic camera was able to achieve. My interest in film
              photographity grew quickly and soon I owned many different film
              cameras, as they were dirt cheap still at that time. The attached
              photo of the inside of an old Cadillac in Cuba was one of the
              first film pictures I've ever shot, yet it still remains as one of
              my all time favourites.
            </p>
          </div>

          <div className="flex_item_img" id="indeximg2">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/digitekniikatlopputyo.appspot.com/o/frontPageImages%2Fkuuba12.jpg?alt=media&token=87636dc5-014d-4223-9a35-493000596129"
              alt="kuva risteyksestä Havannassa"
            />
          </div>
        </div>
      </Container>
    </>
  );
}
