import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';
import MeetupCard from '../components/meetup/MeetupCard';
import Button from '../components/ui/Button';
import type { Meetup } from '../services/meetupApi';
import { fetchAllMeetups } from '../services/meetupApi';
import { api } from '../services/apiClient';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  registration: string[];
}

export default function MeetupInfoPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [meetup, setMeetup] = useState<Meetup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [userRegistered, setUserRegistered] = useState(false);

  useEffect(() => {
    const loadMeetupAndUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const [allMeetups, userData] = await Promise.all([
          fetchAllMeetups(),
          api<UserProfile>('/user/me', { method: 'GET' }),
        ]);

        const found = allMeetups.find((m) => m.id === id);

        if (found) {
          setMeetup(found);

          const isRegistered = found.registrations.some((regId) => regId === userData.id);
          setUserRegistered(isRegistered);
          setError(null);
        } else {
          setError('Meetup hittades inte');
        }
      } catch (err) {
        setError('Kunde inte hämta meetup eller användardata');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMeetupAndUser();
  }, [id]);

  if (loading) return <p className="text-white">Laddar...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!meetup) return null;

  const formatDate = (dateArray: string[]) =>
    dateArray && dateArray.length > 0
      ? new Date(dateArray[0]).toLocaleDateString('sv-SE', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : 'Datum ej angivet';

  const formatLocation = (location?: { city: string; address: string }) =>
    location ? location.city : 'Plats ej angiven';

  const meetupDate = meetup.date && meetup.date.length > 0 ? new Date(meetup.date[0]) : new Date();
  const today = new Date();

  let buttonText = '';
  let buttonAction: (() => void) | undefined;
  let buttonDisabled = false;

  const handleRegister = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/meetups/${meetup.id}/register`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Kunde inte registrera');
      setUserRegistered(true);
      alert('Du är nu registrerad!');
    } catch (err) {
      console.error(err);
      alert('Kunde inte registrera dig');
    }
  };

  const handleUnregister = async () => {
    const confirm = window.confirm('Vill du avregistrera dig från detta meetup?');
    if (!confirm) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/meetups/${meetup.id}/register`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Kunde inte avregistrera');
      setUserRegistered(false);
      alert('Du är nu avregistrerad!');
    } catch (err) {
      console.error(err);
      alert('Kunde inte avregistrera dig');
    }
  };

  if (today < meetupDate) {
    if (!userRegistered) {
      buttonText = 'Registrera dig';
      buttonAction = handleRegister;
    } else {
      buttonText = 'Avregistrera dig';
      buttonAction = handleUnregister;
    }
  } else {
    if (userRegistered) {
      buttonText = 'Betygsätt & Recensera';
      buttonAction = () => navigate(`/review?meetupId=${meetup.id}`, {state: { title: meetup.title }});
    } else {
      buttonText = 'Registrering stängd';
      buttonDisabled = true;
    }
  }

  return (
    <main className="main text-white p-5 flex flex-col gap-6">
      <Header title={meetup.title} />

      <MeetupCard
        title={meetup.title}
        description={meetup.description || 'Ingen beskrivning'}
        location={formatLocation(meetup.location)}
        date={formatDate(meetup.date)}
        time={meetup.time || ''}
        category={meetup.category || 'Övrigt'}
      />

      <Button onClick={buttonAction} disabled={buttonDisabled}>
        {buttonText}
      </Button>
    </main>
  );
}

