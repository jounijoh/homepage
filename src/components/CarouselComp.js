import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ControlledCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://firebasestorage.googleapis.com/v0/b/digitekniikatlopputyo.appspot.com/o/frontPageImages%2Fomakuva.jpg?alt=media&token=f94ed0b5-7561-4493-91ca-116b246fbecb"
            alt="Me on a field with Bronica SQ-A, taken by Janne Enberg"
          />
          <Carousel.Caption>
            <h2>Welcome to FilmPic</h2>
            <p>This site introduces my photographs taken on film</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 h-90"
            src="https://firebasestorage.googleapis.com/v0/b/digitekniikatlopputyo.appspot.com/o/frontPageImages%2Fbudapestissa.jpg?alt=media&token=132dc8ce-ad22-4892-97e2-df23d05138e5"
            alt="Me with my friends in Budabest, taken by unkown friend using my camera"
          />
  
          <Carousel.Caption>
            <h3>I've photographed on film for four years now</h3>
            <p>I've fallen in love in the process of creating your own photographs from start to finish</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://firebasestorage.googleapis.com/v0/b/digitekniikatlopputyo.appspot.com/o/frontPageImages%2Faito.jpg?alt=media&token=b7c89dde-77f0-41a0-b039-eabc39675f22"
            alt="Old gentleman walking in central Helsinki"
          />
  
          <Carousel.Caption>
            <h3>Photograps on film just look more natural to me</h3>
            <p>
              There is something magical in the imperfection and grain on them
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }