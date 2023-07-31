import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import "./App.css"
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import SearchRoomPage from "./pages/SearchRoomPage";
import CreateRoomPage from "./pages/CreateRoomPage";
import AboutRoomPage from "./pages/AboutRoomPage";
import AboutDetailPlan from "./pages/AboutDetailPlan";
import JoinPage from "./pages/JoinPage";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<LoginPage />}/>
          <Route path="/users" element={<SignupPage />}/>
          <Route path="/rooms" element={<HomePage/>}/>
          <Route path="/searchRoom" element={<SearchRoomPage />}/>
          <Route path="/createRoom" element={<CreateRoomPage />}/>
          <Route path="/aboutRoom" element={<AboutRoomPage />}/>
          <Route path="/detailPlan" element={<AboutDetailPlan />}/>
          <Route path="/joinPage" element={<JoinPage />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
