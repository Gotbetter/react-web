import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import "./App.css";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import SearchRoomPage from "./pages/SearchRoomPage";
import CreateRoomPage from "./pages/CreateRoomPage";
import AboutRoomPage from "./pages/AboutRoomPage";
import AboutDetailPlan from "./pages/AboutDetailPlan";
import JoinPage from "./pages/JoinPage";
import CertificationPage from "./pages/CertificationPage";
import Layout from "./components/layouts/Layout";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/users" element={<SignupPage />} />
          <Route path="/rooms" element={<HomePage />} />
          <Route path="/searchRoom" element={<SearchRoomPage />} />
          <Route path="/createRoom" element={<CreateRoomPage />} />
          <Route path="/aboutRoom" element={<AboutRoomPage />} />
          <Route path="/detailPlan" element={<AboutDetailPlan />} />
          <Route path="/joinPage" element={<JoinPage />} />
          <Route path="/certification" element={<CertificationPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
