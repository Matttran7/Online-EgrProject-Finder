import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/home"
import Locations from "./Pages/locations"
import SubmitProject from "./Pages/submitProject"
import ThankyouSubmit from "./Pages/thankyouSubmit";

function App(){
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/locations" element={<Locations />} />
        <Route exact path="/submitProject" element={<SubmitProject />} />
        <Route exact path="/thankyouSubmit" element={<ThankyouSubmit />} />
      </Routes>
    </Router>
  );
}

export default App;