import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/home"
import Locations from "./Pages/locations"

function App(){
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/locations" element={<Locations />} />
      </Routes>
    </Router>
  );
}

export default App;