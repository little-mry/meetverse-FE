import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MeetupCard from '../components/meetup/MeetupCard';
import type { Meetup } from '../services/meetupApi';
import { fetchAllMeetups } from '../services/meetupApi';

export default function MeetupsPage() {
  const navigate = useNavigate();
  const [meetups, setMeetups] = useState<Meetup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMeetups = async () => {
      try {
        setLoading(true);
        const data = await fetchAllMeetups();
        setMeetups(data);
        setError(null);
      } catch (err) {
        setError('Kunde inte hämta meetups');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMeetups();
  }, []);

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
        <p className="text-xl">Laddar meetups...</p>
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

  return (
    <main className="main text-white p-5 flex flex-col">
      <header className="w-full flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold mb-8 text-center pt-9">Hitta Meetups</h1>

        <input
          type="text"
          placeholder="Sök efter meetups..."
          className="w-11/12 sm:w-96 p-2 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none text-center mb-4"
        />

        <div className="flex flex-col sm:flex-row gap-3 w-11/12 sm:w-auto justify-center">
          <input
            type="date"
            className="p-2 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:outline-none w-full sm:w-44"
          />

          <select className="p-2 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:outline-none w-full sm:w-44">
            <option value="">Plats</option>
            <option>Stockholm</option>
            <option>Göteborg</option>
            <option>Malmö</option>
            <option>Uppsala</option>
          </select>

          <select className="p-2 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:outline-none w-full sm:w-44">
            <option value="">Kategori</option>
            <option>Tech</option>
            <option>Matlagning</option>
            <option>Kreativt</option>
            <option>Hälsa</option>
            <option>Gaming</option>
          </select>
        </div>
      </header>

      {meetups.length === 0 ? (
        <p className="text-center text-gray-400 text-lg mt-8">Inga meetups tillgängliga just nu</p>
      ) : (
        <section className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3">
          {meetups.map((meetup) => (
            <MeetupCard
              key={meetup.id}
              title={meetup.title}
              description={meetup.description || 'Ingen beskrivning'}
              location={formatLocation(meetup.location)}
              date={formatDate(meetup.date)}
              time={meetup.time || ''}
              category={meetup.category || 'Övrigt'}
              onClick={() => navigate(`/meetups/${meetup.id}`)}
            />
          ))}
        </section>
      )}
    </main>
  );
}
