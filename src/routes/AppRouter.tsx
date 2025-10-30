import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MeetupsPage from '../pages/MeetupsPage';
import ProfilePage from '../pages/ProfilePage';
import MeetupsInfo from '../pages/MeetupsInfo';

export default function AppRouter() {
  return (
    <div className="main">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/meetups" element={<MeetupsPage />} />
          <Route path="/meetupsinfo" element={<MeetupsInfo />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
