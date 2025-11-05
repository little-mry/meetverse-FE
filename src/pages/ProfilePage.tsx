import Profile from '../components/profile/Profile';
import Header from '../components/common/Header';
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getUserProfile } from '../services/userApi';
import { fetchAllMeetups } from '../services/meetupApi';
import type { Meetup } from '../types/meetup.types';
import { getErrorMessage } from '../services/errorUtils';

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [myMeetups, setMyMeetups] = useState<Meetup[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileAndMeetups = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [userData, allMeetups] = await Promise.all([getUserProfile(), fetchAllMeetups()]);

        setUsername(userData.username);
        setEmail(userData.email);

        const registeredIds = new Set(userData.registration);
        const userMeetups = allMeetups.filter((meetup) => registeredIds.has(meetup.id));
        setMyMeetups(userMeetups);
      } catch (err: unknown) {
        setError(getErrorMessage(err, 'Failed to load profile data.'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileAndMeetups();
  }, []);

  const displayedMeetups = useMemo(() => {
    const now = new Date();

    return myMeetups.filter((meetup) => {
      const meetupDate = new Date(meetup.date[0]);

      if (activeTab === 'upcoming') {
        return meetupDate >= now;
      } else {
        return meetupDate < now;
      }
    });
  }, [myMeetups, activeTab]);

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
    <div className=" flex flex-col items-center w-full px-5 py-5 ">
      <Header title="Profile" />

      <div className="w-full max-w-4xl p-4">
        <Profile email={email} username={username} />
      </div>

      <div className="w-full max-w-4xl p-4 mt-6">
        <div className="flex border-b border-gray-700 mb-4">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`py-2 px-4 font-semibold ${
              activeTab === 'upcoming'
                ? 'border-b-2 border-indigo-500 text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Anmälda
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`py-2 px-4 font-semibold ${
              activeTab === 'past'
                ? 'border-b-2 border-indigo-500 text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Tidigare
          </button>
        </div>

        <div className="space-y-4">
          {displayedMeetups.length > 0 ? (
            displayedMeetups.map((meetup) => (
              <Link key={meetup.id} to={`/meetups/${meetup.id}`} className="block">
                <div
                  className="bg-gray-800 p-4 rounded-lg shadow-md 
                             hover:bg-gray-700 transition-all duration-200 cursor-pointer"
                >
                  <h3 className="text-xl font-bold">{meetup.title}</h3>
                  <p className="text-sm text-gray-400">
                    {new Date(meetup.date[0]).toLocaleDateString('sv-SE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </p>
                  <p className="mt-2 text-gray-300">{meetup.description}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-400">
              Du har inga {activeTab === 'upcoming' ? 'anmälda' : 'tidigare'} meetups.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
