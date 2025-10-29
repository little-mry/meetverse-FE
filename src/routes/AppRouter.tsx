import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MeetupsPage from "../pages/MeetupsPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/meetups" element={<MeetupsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
