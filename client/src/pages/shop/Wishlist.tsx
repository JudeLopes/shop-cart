import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/shop/ProductCard";
import { Heart, Loader2, ShoppingBag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

const Wishlist = () => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetch(`http://localhost:5000/api/wishlist/${user.user_id || user.id}`)
      .then(res => res.json())
      .then(data => {
        setWishlistItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  if (loading) return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center gap-4">
      <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      <p className="text-muted-foreground font-medium italic">Loading your favorites...</p>
    </div>
  );

  if (!user) return (
    <div className="container mx-auto px-4 py-32 text-center">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
        <Heart className="w-12 h-12 text-muted-foreground" />
      </div>
      <h2 className="text-3xl font-black text-foreground mb-4">Your Wishlist is Private</h2>
      <p className="text-muted-foreground font-medium mb-8 max-w-md mx-auto">Log in to save your favorite products and sync them across all your devices.</p>
      <Link to="/login" className="bg-indigo-600 text-white font-black px-10 py-4 rounded-2xl shadow-xl hover:shadow-indigo-500/30 transition-all active:scale-95">Go to Login</Link>
    </div>
  );

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-12 h-12 text-indigo-600" />
        </div>
        <h2 className="text-3xl font-black text-foreground mb-4">Your Wishlist is Empty</h2>
        <p className="text-muted-foreground font-medium mb-8 max-w-md mx-auto">Explore our collection and click the heart icon to save items you love!</p>
        <Link to="/products" className="bg-indigo-600 text-white font-black px-10 py-4 rounded-2xl shadow-xl hover:shadow-indigo-500/30 transition-all active:scale-95">Discover Products</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-black text-foreground flex items-center gap-4">
            <Heart className="w-10 h-10 text-rose-500 fill-rose-500" />
            My Wishlist
          </h1>
          <p className="text-muted-foreground font-medium mt-2">Saved items synchronized with your database</p>
        </div>
        <div className="bg-card border border-border px-6 py-3 rounded-2xl font-black text-indigo-600 shadow-sm">
          {wishlistItems.length} ITEMS
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {wishlistItems.map(p => (
          <div key={p.id} className="group relative">
             <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
