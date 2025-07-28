import "./App.css";
import NavBar from "./Components/NavBar/Navbar";
import { Route, Routes } from "react-router-dom";
import  {Home, Admin, Institute,Holder,Verifier,Finder,About,CETA,MediaMention}  from "./Components/index";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import InvestmentPage from "./Components/Investment/Investment";
import TermsAndConditions from './Components/Legals/TermCond';
import PrivacyPolicy from './Components/Legals/PrivacyPolicy';
import AppPolicy from "./Components/Legals/AppPolicy";

function App() {

  useEffect(() => {
    if(window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      })
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      })
  }
})
  return (
    <>
    <div><Toaster position="top-right"/></div>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/ceta" element={<CETA />} />
        <Route path="/investment" element={<InvestmentPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/media-mention" element={<MediaMention />} />
        <Route path="/issuer" element={<Institute />} />
        <Route path="/holder" element={<Holder />} />
        <Route path="/verifier" element={<Verifier />} />
        <Route path="/finder" element={<Finder/>} />
        <Route path="/terms-conditions" element={<TermsAndConditions/>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
        <Route path="/app-policy" element={<AppPolicy/>} />
      </Routes>
    </>
  );
}

export default App;
