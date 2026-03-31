import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import StarRating from "@/components/shop/StarRating";
import { ShoppingCart, Heart, Minus, Plus, Package, Check, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const [wishlisted, setWishlisted] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, rRes] = await Promise.all([
          fetch(`http://localhost:5000/api/products/${id}`),
          fetch(`http://localhost:5000/api/reviews/${id}`)
        ]);
        const pData = await pRes.json();
        const rData = await rRes.json();
        setProduct(pData);
        setReviews(rData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleAddReview = async () => {
    if (!user) return toast.error("Log in to post a review");
    if (!newRating) return toast.error("Select a rating");
    
    try {
      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.user_id || user.id,
          user_name: user.full_name || user.name,
          product_id: Number(id),
          rating: newRating,
          review_text: newReview
        })
      });
      if (!res.ok) throw new Error();
      toast.success("Review posted!");
      setNewRating(0);
      setNewReview("");
      // Refresh reviews
      const rRes = await fetch(`http://localhost:5000/api/reviews/${id}`);
      setReviews(await rRes.json());
    } catch (err) {
      toast.error("Could not post review");
    }
  };

  const handleWishlist = async () => {
    if (!user) return toast.error("Log in to use wishlist");
    try {
      const method = wishlisted ? "DELETE" : "POST";
      const url = wishlisted 
        ? `http://localhost:5000/api/wishlist/${user.user_id || user.id}/${id}`
        : "http://localhost:5000/api/wishlist";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: wishlisted ? undefined : JSON.stringify({ user_id: user.user_id || user.id, product_id: Number(id) })
      });
      if (!res.ok) throw new Error();
      setWishlisted(!wishlisted);
      toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist");
    } catch (err) {
      toast.error("Wishlist sync failed");
    }
  };

  if (loading) return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center gap-4">
      <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      <p className="text-muted-foreground font-medium italic">Getting product details...</p>
    </div>
  );
  if (!product) return <div className="container mx-auto px-4 py-20 text-center text-muted-foreground text-lg">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images */}
        <div className="space-y-4">
          <div className="bg-card rounded-2xl border border-border p-8 shadow-sm flex items-center justify-center min-h-[400px]">
            <img src={product.images?.[selectedImage] || product.image_url} alt={product.name} className="max-w-full max-h-96 object-contain hover:scale-105 transition-transform duration-500" />
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img: string, i: number) => (
                <button key={i} onClick={() => setSelectedImage(i)} className={`shrink-0 w-24 h-24 rounded-xl border-2 transition-all overflow-hidden bg-white ${selectedImage === i ? "border-indigo-600 scale-105 shadow-md" : "border-border hover:border-indigo-300"}`}>
                  <img src={img} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="py-2">
          <p className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em] mb-3">{product.brand || "Exclusive"}</p>
          <h1 className="text-4xl font-black text-foreground mb-4 leading-tight">{product.name}</h1>
          <div className="flex items-center gap-3 mb-6">
            <StarRating rating={product.rating || 0} />
            <span className="text-sm text-muted-foreground font-semibold">({reviews.length} Verified Reviews)</span>
          </div>

          <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100 mb-8">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-4xl font-black text-indigo-700">₹{Number(product.effective_price).toLocaleString()}</span>
              {product.discount_pct > 0 && (
                <span className="text-xl text-muted-foreground line-through decoration-indigo-200">₹{Number(product.price).toLocaleString()}</span>
              )}
            </div>
            {product.discount_pct > 0 && (
              <span className="inline-block bg-indigo-600 text-white text-xs font-black px-3 py-1 rounded-full animate-bounce mt-2 uppercase tracking-wider">Save {product.discount_pct}% Today</span>
            )}
          </div>

          <div className="flex items-center gap-4 mb-8">
            {product.stock_qty > 0 ? (
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-black border border-emerald-100">
                <Check className="w-4 h-4" /> IN STOCK ({product.stock_qty} UNIT)
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-rose-50 text-rose-700 px-4 py-2 rounded-xl text-sm font-black border border-rose-100">
                <Package className="w-4 h-4" /> SOLD OUT
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center bg-muted/30 rounded-2xl border border-border p-1">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-white hover:shadow-sm rounded-xl transition-all"><Minus className="w-5 h-5 text-indigo-600" /></button>
              <span className="px-6 font-black text-lg min-w-[60px] text-center">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock_qty || 99, quantity + 1))} className="p-3 hover:bg-white hover:shadow-sm rounded-xl transition-all"><Plus className="w-5 h-5 text-indigo-600" /></button>
            </div>
            
            <button 
              onClick={() => addToCart(product, quantity)} 
              disabled={product.stock_qty === 0} 
              className="flex-1 min-w-[200px] flex items-center justify-center gap-3 bg-indigo-600 text-white font-black py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-xl hover:shadow-indigo-500/30 disabled:grayscale active:scale-95"
            >
              <ShoppingCart className="w-6 h-6" /> ADD TO CART
            </button>
            
            <button onClick={handleWishlist} className={`p-4 rounded-2xl border-2 transition-all active:scale-95 ${wishlisted ? "bg-rose-50 border-rose-200 text-rose-500 shadow-rose-200" : "bg-white border-border hover:border-rose-200 hover:text-rose-500"}`}>
              <Heart className={`w-6 h-6 ${wishlisted ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-20">
        <div className="flex gap-10 border-b border-border mb-10 overflow-x-auto no-scrollbar">
          {(["description", "reviews"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-6 text-sm font-black uppercase tracking-widest border-b-4 transition-all whitespace-nowrap ${activeTab === tab ? "border-indigo-600 text-indigo-600" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {tab === "description" ? "Specification" : `Customer Reviews (${reviews.length})`}
            </button>
          ))}
        </div>
        
        <div className="pb-20">
          {activeTab === "description" ? (
            <div className="max-w-4xl">
              <p className="text-xl text-muted-foreground leading-relaxed whitespace-pre-line font-medium border-l-4 border-indigo-100 pl-8">{product.description}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2 space-y-8">
                {reviews.length > 0 ? reviews.map((r: any) => (
                  <div key={r.review_id} className="bg-card rounded-3xl border border-border p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-indigo-600/20">{r.user_name?.charAt(0)}</div>
                        <div>
                          <p className="font-black text-foreground">{r.user_name}</p>
                          <StarRating rating={r.rating} size={14} />
                        </div>
                      </div>
                      <span className="text-xs font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full">{new Date(r.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-muted-foreground font-medium leading-relaxed italic">"{r.review_text}"</p>
                  </div>
                )) : (
                  <div className="text-center py-20 bg-muted/10 border-2 border-dashed border-border rounded-[40px]">
                    <p className="text-muted-foreground font-black italic">No feedback yet. Be the pioneer!</p>
                  </div>
                )}
              </div>
              
              <div className="space-y-6">
                <div className="bg-indigo-600 text-white p-8 rounded-[40px] shadow-2xl sticky top-24">
                  <h3 className="text-2xl font-black mb-2 leading-tight">Rate this Experience</h3>
                  <p className="text-indigo-100 text-sm font-medium mb-8">Share your thoughts with the community</p>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-black uppercase tracking-widest opacity-70 mb-3 block">Overall Rating</label>
                      <StarRating rating={newRating} interactive onChange={setNewRating} />
                    </div>
                    <div>
                      <label className="text-xs font-black uppercase tracking-widest opacity-70 mb-3 block">Your feedback</label>
                      <textarea value={newReview} onChange={e => setNewReview(e.target.value)} placeholder="What's your story?" rows={5} className="w-full bg-indigo-500/50 border-2 border-indigo-400 rounded-2xl p-4 text-sm font-medium placeholder:text-indigo-200 outline-none focus:border-white transition-all shadow-inner" />
                    </div>
                    <button onClick={handleAddReview} className="w-full bg-white text-indigo-700 font-black py-4 rounded-2xl hover:scale-[1.02] transition-all shadow-xl active:scale-95">PUBLISH REVIEW</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
