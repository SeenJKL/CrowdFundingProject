import React from "react";
import { Route, Routes } from "react-router-dom";

import { Sidebar, Navbar, Footer } from "./components";
import {
  CampaignDetails,
  CreateCampaign,
  Dashboard,
  Home,
  Profile,
  Withdraw,
  Ranking,
} from "./pages";

const App = () => {
  return (
    <div>
      <div className="relative sm:-8 p-4 min-h-screen flex flex-row">
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>

        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          </Routes>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
