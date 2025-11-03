import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/ui/Header';
import MeetupCard from '../components/meetup/MeetupCard';
import Button from '../components/ui/Button';
import type { Meetup } from '../services/meetupApi';
import { fetchAllMeetups } from '../services/meetupApi';

export default function MeetupInfo() {
  const { id } = useParams<{ id: string }>();
  const [meetup, setMeetup] = useState<Meetup | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMeetup = async () => {
      try {
        setLoading(true);
        const allMeetups = await fetchAllMeetups();
        const found = allMeetups.find((m) => m.id === id);
        if (found) {
          setMeetup(found);
          setError(null);
        } else {
          setError('Meetup hittades inte');
        }
      } catch (err) {
        setError('Kunde inte hämta meetup');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMeetup();
  }, [id]);

  const formatDate = (dateArray: string[]): string => {
    if (!dateArray || dateArray.length === 0) return 'Datum ej angivet';
    return new Date(dateArray[0]).toLocaleDateString('sv-SE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatLocation = (location?: { city: string; address: string }): string => {
    return location ? location.city : 'Plats ej angiven';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p className="text-xl">Laddar meetup...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  if (!meetup) return null;

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

      {/* FIXA LOGIK PÅ KNAPPEN */}

      <Button onClick={() => alert(`Du har registrerat dig till ${meetup.title}!`)}>
        Registrera dig
      </Button>
    </main>
  );
}
