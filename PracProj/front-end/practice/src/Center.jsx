import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import App from "./App";

function Center() {

  return (
    <>
    <Router>
      {/* <nav style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>*/}
      <Routes> 
        <Route  path="/" element={<App />} />
        <Route path="/:pageID" element={<App />} />
      </Routes>
    </Router>
    </>
  )
}

export default Center;
