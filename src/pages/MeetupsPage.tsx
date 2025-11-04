import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MeetupCard from '../components/meetup/MeetupCard';
import type { Meetup } from '../services/meetupApi';
import { fetchAllMeetups } from '../services/meetupApi';
import Header from '../components/ui/Header';
import SelectFilter, { type Option } from '../components/meetup/SelectFilter';

export default function MeetupsPage() {
  const navigate = useNavigate();
  const [meetups, setMeetups] = useState<Meetup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');

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

  const uniqueCities = useMemo<Option[]>(() => {
    const cities = meetups
      .map((m) => m.location?.city?.trim())
      .filter((c): c is string => Boolean(c));
    return Array.from(new Set(cities)).map((c) => ({ value: c, label: c }));
  }, [meetups]);

  const uniqueCategories = useMemo<Option[]>(() => {
    const cats = meetups.map((m) => m.category?.trim()).filter((c): c is string => Boolean(c));
    return Array.from(new Set(cats)).map((c) => ({ value: c, label: c }));
  }, [meetups]);

  const filteredMeetups = useMemo(() => {
    return meetups.filter((m) => {
      const matchSearch =
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.description?.toLowerCase().includes(search.toLowerCase());
      const matchCity = city ? m.location?.city === city : true;
      const matchCategory = category ? m.category === category : true;
      const matchDate = selectedDate
        ? m.date.some((d) => new Date(d).toISOString().startsWith(selectedDate))
        : true;
      return matchSearch && matchCity && matchCategory && matchDate;
    });
  }, [meetups, search, city, category, selectedDate]);

  const now = new Date();
  const upcomingMeetups = filteredMeetups.filter((m) => new Date(m.date[0]) >= now);
  const pastMeetups = filteredMeetups
    .filter((m) => new Date(m.date[0]) < now)
    .sort((a, b) => new Date(b.date[0]).getTime() - new Date(a.date[0]).getTime());

  const formatDate = (dateArray: string[]): string => {
    if (!dateArray?.length) return 'Datum ej angivet';
    return new Date(dateArray[0]).toLocaleDateString('sv-SE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatLocation = (location?: { city: string; address: string }) => {
    return location?.city || 'Plats ej angiven';
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
        <Header title="Hitta Meetups" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Sök efter meetups..."
          className="w-11/12 sm:w-96 p-2 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none text-center mb-4"
        />

        <div className="flex flex-col sm:flex-row gap-3 w-11/12 sm:w-auto justify-center">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:outline-none w-full sm:w-44"
          />

          <SelectFilter
            value={city}
            onChange={setCity}
            options={uniqueCities}
            placeholder="Plats"
            className="w-full sm:w-44"
          />

          <SelectFilter
            value={category}
            onChange={setCategory}
            options={uniqueCategories}
            placeholder="Kategori"
            className="w-full sm:w-44"
          />
        </div>
      </header>

      {upcomingMeetups.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-3 text-center">Kommande meetups</h2>
          <section className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {upcomingMeetups.map((meetup) => (
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
        </>
      )}

      {pastMeetups.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-3 text-center text-gray-400">Tidigare meetups</h2>
          <section className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3 opacity-60 grayscale">
            {pastMeetups.map((meetup) => (
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
        </>
      )}

      {filteredMeetups.length === 0 && (
        <p className="text-center text-gray-400 text-lg mt-8">Inga meetups matchar din sökning</p>
      )}
    </main>
  );
}
