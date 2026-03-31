import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import StarRating from "./StarRating";
import toast from "react-hot-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product }: any) => {
  const { addToCart } = useCart();
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow border overflow-hidden">
      <Link to={`/product/${product.product_id || product.id}`}>
        <img 
          src={product.image_url?.trim()} 
          className="w-full h-48 object-cover" 
          alt={product.name}
        />
      </Link>

      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold">₹{product.effective_price || product.price}</span>
          {product.discount_pct > 0 && (
            <span className="line-through text-gray-500">₹{product.price}</span>
          )}
        </div>

        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product);
          }}
          className="w-full mt-3 bg-indigo-600 text-white"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
