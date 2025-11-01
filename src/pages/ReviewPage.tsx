/* OBS lägg till detta på meetuppage:
<Link to={`/meetups/${m.id}/review`} state={{ title: m.title }}>
  Betygsätt & Recensera
</Link> */

import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import Header from '../components/ui/Header';
import StarRating from '../components/review/StarRating';
import { postReview, fetchMeetupById } from '../features/meetupApi';

type LocationState = { title?: string };

const ReviewPage = () => {
  const { id: meetupId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as LocationState) ?? {};

  const [meetupTitle, setMeetupTitle] = useState<string>(state.title ?? '');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  // Get title fallback, if route state is missing
    useEffect(() => {
    if (!meetupTitle && meetupId) {
      (async () => {
        try {
          const m = await fetchMeetupById(meetupId);
          setMeetupTitle(m.title);
        } catch (e) {
          console.warn('Kunde inte hämta meetup:', e);
        }
      })();
    }
  }, [meetupId, meetupTitle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Betyg:', rating, 'Recension:', review);
    if (!meetupId) return;
    setIsLoading(true);
    setError(null);
    try {
      await postReview(meetupId, rating, review);
      navigate(`/meetups/${meetupId}`);
    } catch (error: any) {
      // måste använda 'any' här tills vi har en bättre felhanteringsstrategi
      setError(error.message || 'Review submission failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-10 pt-4">
      <Header title="Betygsätt & Recensera" />
      <main className="w-full max-w-3xl">
        <h2 className="text-center text-xl font-semibold mb-6">
          {meetupTitle || 'Meetup'}
          </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full lg:flex-row justify-center gap-4 lg:gap-10 p-6  lg:p-9"
        >
          <div className="flex flex-col items-center gap-2 lg:gap-6 flex-1">
            <h3 className="text-lg font-medium">Hur många stjärnor ger du meetupet?</h3>
            <StarRating value={rating} onChange={setRating} />
          </div>

          <div className="flex flex-col items-center lg:items-stretch gap-2 flex-1">
            <textarea
              className="w-full min-h-40 bg-slate-400 resize-y rounded-md p-2 text-black lg:text-lg focus:outline-none focus:ring-2 focus:ring-slate-600"
              placeholder="Skriv din recension..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              type="submit"
              disabled={rating === 0 || isLoading}
              className="w-full py-3 text-base lg:text-lg"
            >
              {isLoading ? 'Skickar…' : 'Skicka in'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ReviewPage;
