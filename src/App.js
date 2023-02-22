import ImageGallery from "./components/YourPhotos"
import ResponsiveAppBar from "./components/AppBar";
import HomePage from "./components/HomePage";
import "./App.css";
import ScrollButton from "./components/ScrollButton";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyPhotos from "./components/Myphotos";
import SimpleBottomNavigation from "./components/Bottom";
import Contact from "./components/ContactPage";
import GalleryWithData from "./components/GalleryWithData";


function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <ResponsiveAppBar/>
        <Routes>
          {["/", "/homepage"].map((path) => (
            <Route path={path} element={<HomePage />} />
          ))}
          <Route path="/myphotos" element={<MyPhotos />} />
          <Route path="/photodump" element={<ImageGallery />} />
          <Route path="/data" element={<GalleryWithData />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <SimpleBottomNavigation />
      </BrowserRouter>
      <ScrollButton />
      <br/>
     
    </div>
    
  );
}

export default App;
