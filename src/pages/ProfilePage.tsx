import Profile from '../components/Profile/Profile';
import Header from '../components/ui/Header';
import { api } from '../services/apiClient';
import { useState, useEffect } from 'react';

interface UserProfile {
  username: string;
  email: string;
}

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await api<UserProfile>('/user/me', { method: 'GET' });

        setUsername(data.username);
        setEmail(data.email);
      } catch (err: any) {
        setError(err.message || 'Kunde inte hämta profil');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className=" flex flex-col items-center w-full ">
        <Header title="Profile" />
        <p className="mt-4">Laddar profil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className=" flex flex-col items-center w-full ">
        <Header title="Profile" />
        <p className="mt-4 text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className=" flex flex-col items-center w-full ">
      <Header title="Profile" />
      <Profile email={email} username={username} />
    </div>
  );
};

export default ProfilePage;
