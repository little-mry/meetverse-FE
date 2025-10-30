import Button from '../components/ui/Button';
import Header from '../components/ui/Header';
import { useState } from 'react';
import StarRating from '../components/review/StarRating';

const ReviewPage = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hantera inskickning av betyg och recension här
    console.log('Betyg:', rating, 'Recension:', review);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-10 pt-4">
      <Header title="Betygsätt & Recensera" />
      <main className="w-full max-3xl">
        <h2 className="text-center text-xl font-semibold mb-6">Namnet på meetup-eventet!</h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full lg:flex-row justify-center gap-4 lg:gap-10 p-6  lg:pg-9"
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
            <Button
              type="submit"
              disabled={rating === 0}
              className="w-full py-3 text-base lg:text-lg"
            >
              Skicka in
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};
export default ReviewPage;
