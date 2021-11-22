import { Container } from "react-bootstrap";
import "./App.css";
import Login from "./Components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import ManagementPortal from "./Components/ManagementPortal";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Container>
      <ToastContainer />
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/management" element={<ManagementPortal />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
