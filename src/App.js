import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import ClaimToken from "./pages/ClaimToken";
import GetVestingInfo from "./pages/GetVestingInfo";
import { ConnectProvider } from './context/Connect';


function App() {
  return (
    <ConnectProvider>
      <Router>
        <Navbar />
        <Routes>
        <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/claimToken" element={<ClaimToken  />}></Route>
          <Route exact path="/getVestingInfo" element={<GetVestingInfo />}></Route>
        </Routes>
        <Footer />
      </Router>
    </ConnectProvider>
  );
}

export default App;
