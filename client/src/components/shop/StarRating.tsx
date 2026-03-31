import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const StarRating = ({ rating, max = 5, size = 16, interactive = false, onChange }: StarRatingProps) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: max }, (_, i) => {
      const filled = i < Math.floor(rating);
      const half = !filled && i < rating;
      return (
        <button
          key={i}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onChange?.(i + 1)}
          className={interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}
        >
          <Star
            size={size}
            className={filled ? "fill-warning text-warning" : half ? "fill-warning/50 text-warning" : "text-border"}
          />
        </button>
      );
    })}
  </div>
);

export default StarRating;
