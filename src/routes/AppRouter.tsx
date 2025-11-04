import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MeetupsPage from '../pages/MeetupsPage';
import ProfilePage from '../pages/ProfilePage';
import MeetupInfoPage from '../pages/MeetupInfoPage';
import ReviewPage from '../pages/ReviewPage';

export default function AppRouter() {
  return (
    <div className="main">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/meetups" element={<MeetupsPage />} />
          <Route path="/meetups/:id" element={<MeetupInfoPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/meetups/:id/review" element={<ReviewPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
