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
    <div className="min-h-screen flex flex-col items-center px-10 pt-4">
      <Header title="Betygsätt & Recensera" />
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 p-6 max-w-lg mx-auto">
        <h2>Namnet på meetup-eventet!</h2>
        <h3>Hur många stjärnor ger du meetupet?</h3>
        <StarRating value={rating} onChange={setRating} />
        <textarea
          className="w-full bg-slate-400 min-h-screen rounded-md p-2 text-black"
          placeholder="Skriv din recension..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <Button type="submit" disabled={rating === 0}>
          Skicka in
        </Button>
      </form>
    </div>
  );
};
export default ReviewPage;
