import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';
import MeetupCard from '../components/meetup/MeetupCard';
import Button from '../components/ui/Button';
import type { Meetup } from '../services/meetupApi';
import { fetchMeetupById, registerToMeetup, unregisterFromMeetup } from '../services/meetupApi';
import { getUserProfile } from '../services/userApi';

export default function MeetupInfoPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [meetup, setMeetup] = useState<Meetup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRegistered, setUserRegistered] = useState(false);

  useEffect(() => {
    if (!id) {
      setError('Ogiltigt meetup-id');
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const [m, user] = await Promise.all([fetchMeetupById(id), getUserProfile()]);
        setMeetup(m);

        const isRegistered = m.registrations.some((regName) => regName === user.username);

        setUserRegistered(isRegistered);
      } catch (err) {
        console.error(err);
        setError('Kunde inte hämta meetup eller användardata');
      } finally {
        setLoading(false);
      }
    })();
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

  const meetupDate = meetup.date?.length ? new Date(meetup.date[0]) : new Date();
  const today = new Date();

  const handleRegister = async () => {
    try {
      if (!meetup) return;
      await registerToMeetup(meetup.id);
      setUserRegistered(true);
      alert('Du är nu registrerad!');
    } catch (err) {
      console.error(err);
      alert('Kunde inte registrera dig');
    }
  };

  const handleUnregister = async () => {
    if (!meetup) return;
    const ok = window.confirm('Vill du avregistrera dig från detta meetup?');
    if (!ok) return;

    try {
      await unregisterFromMeetup(meetup.id);
      setUserRegistered(false);
      alert('Du är nu avregistrerad!');
    } catch (err) {
      console.error(err);
      alert('Kunde inte avregistrera dig');
    }
  };

  let buttonText = '';
  let buttonAction: (() => void) | undefined;
  let buttonDisabled = false;

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
      buttonAction = () => navigate(`/meetups/${meetup.id}/review`, { state: { title: meetup.title } });
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

      {meetup.reviews && meetup.reviews.length > 0 ? (
        <section className="bg-gray-800 p-4 rounded-2xl">
          <h2 className="text-lg font-semibold mb-3">Tidigare recensioner</h2>
          <ul className="flex flex-col gap-3">
            {meetup.reviews.map((review, index) => (
              <li key={index} className="border-b border-gray-700 pb-2">
                <p className="text-yellow-400">Betyg: {review.rating}/5</p>
                {review.text && <p className="italic">"{review.text}"</p>}
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p className="text-gray-400 italic">Inga recensioner ännu</p>
      )}

      <Button onClick={buttonAction} disabled={buttonDisabled}>
        {buttonText}
      </Button>
    </main>
  );
}
