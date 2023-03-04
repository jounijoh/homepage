import ImageGallery from "./pages/YourPhotos"
import ResponsiveAppBar from "./components/AppBar";
import HomePage from "./pages/HomePage";
import "./App.css";
import ScrollButton from "./components/ScrollButton";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SimpleBottomNavigation from "./components/BottomNav";
import Contact from "./pages/ContactPage";
import GalleryWithData from "./pages/MyPhotos";


function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <ResponsiveAppBar/>
        <Routes>
          {["/", "/homepage"].map((path) => (
            <Route path={path} element={<HomePage />} />
          ))}
          <Route path="/myphotos" element={<GalleryWithData />} />
          <Route path="/photodump" element={<ImageGallery />} />
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
