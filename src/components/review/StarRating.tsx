import { useState } from 'react';
import starRegular from '../../assets/star-regular.svg';
import starSolid from '../../assets/star-solid.svg';

type starRatingProps = {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  readOnly?: boolean;
};
const StarRating = ({ value, onChange, max = 5, readOnly = false }: starRatingProps) => {
  const [starRating, setStarRating] = useState<number | null>(null);
  const showing = starRating ?? value;

  return (
    <div
      className="flex items-center gap-1"
      onMouseLeave={() => setStarRating(null)}
      role="radiogroup"
      aria-label={`Betyg ${value} av ${max}`}
    >
      {Array.from({ length: max }, (_, i) => {
        const index = i + 1;
        const active = index <= showing;
        return (
          <button
            key={index}
            type="button"
            className="p-0 bg-transparent border-none cursor-pointer"
            onClick={() => onChange(index)}
            onMouseEnter={() => setStarRating(index)}
            disabled={readOnly}
            aria-checked={index === value}
            role="radio"
          >
            <img
              src={active ? starSolid : starRegular}
              className="w-12 lg:w-16"
              alt={`${index} stjärnor`}
            />
          </button>
        );
      })}
    </div>
  );
};
export default StarRating;
