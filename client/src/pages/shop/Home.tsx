import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, RotateCcw, Headphones, Loader2 } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/api/products").then(res => res.json()),
      fetch("http://localhost:5000/api/categories").then(res => res.json())
    ])
      .then(([pData, cData]) => {
        setProducts(pData);
        setCategories(cData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const featured = [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 8);
  const deals = products.filter(p => Number(p.discount_pct) > 10).slice(0, 4);
  const topCategories = categories.filter(c => c.parent_id === null);

  if (loading) return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center gap-4">
      <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      <p className="text-muted-foreground font-medium italic">Preparing your shopping experience...</p>
    </div>
  );

  return (
    <div>
      {/* Hero */}
      <section className="bg-indigo-600 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-indigo-400 rounded-full blur-3xl opacity-20" />
        
        <div className="container mx-auto px-4 py-16 md:py-28 relative">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">
              Revolutionize Your <br /> Shopping Lifestyle
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-10 font-medium leading-relaxed">
              Explore thousands of curated products with exclusive deals up to 50% off. Seamless database synchronization and real-time inventory at your fingertips.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-4 bg-white text-indigo-700 font-black px-10 py-5 rounded-2xl hover:scale-105 transition-all shadow-xl hover:shadow-white/20 active:scale-95 group"
            >
              Start Exploring <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Category Chips */}
      <section className="container mx-auto px-4 -mt-10 relative">
        <div className="flex gap-4 overflow-x-auto p-2 scrollbar-hide no-scrollbar">
          {topCategories.map(cat => (
            <Link
              key={cat.category_id || cat.id}
              to={`/products?category=${cat.category_id || cat.id}`}
              className="shrink-0 px-8 py-4 bg-card rounded-2xl border border-border text-sm font-black hover:bg-indigo-600 hover:text-white transition-all shadow-lg hover:shadow-indigo-500/20 active:scale-95 whitespace-nowrap"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-foreground">Featured Picks</h2>
            <p className="text-muted-foreground font-medium mt-1">Handpicked from our real database collection</p>
          </div>
          <Link to="/products" className="text-indigo-600 font-black flex items-center gap-2 group hover:gap-4 transition-all">
            See everything <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        {featured.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map(p => <ProductCard key={p.product_id || p.id} product={p} />)}
          </div>
        ) : (
          <p className="text-center py-20 text-muted-foreground italic border-2 border-dashed border-border rounded-3xl">No featured products found in your database.</p>
        )}
      </section>

      {/* Fresh Arrivals Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-foreground">Recently Stocked</h2>
              <p className="text-muted-foreground font-medium mt-1">Our latest arrivals directly from the warehouse</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {products.map(p => (
              <div key={p.product_id || p.id} className="scale-95 hover:scale-100 transition-transform">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Deals Banner */}
      <section className="bg-indigo-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 text-center md:text-left">
            <div>
              <h2 className="text-4xl font-black text-foreground tracking-tight flex items-center justify-center md:justify-start gap-4">
                🔥 Hot Database Deals
              </h2>
              <p className="text-lg text-indigo-700/70 font-bold mt-2 uppercase tracking-widest">Limited stock items with discount &gt; 10%</p>
            </div>
          </div>
          
          {deals.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {deals.map(p => <ProductCard key={p.product_id || p.id} product={p} />)}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-indigo-100 shadow-sm">
              <p className="text-indigo-700 font-bold">No items found with active discounts in the database.</p>
            </div>
          )}
        </div>
      </section>

      {/* Premium Trust Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {[
            { icon: Truck, label: "Express Delivery", desc: "Fast logistics for real purchases" },
            { icon: Shield, label: "Encrypted Security", desc: "Your transactions are always safe" },
            { icon: RotateCcw, label: "Hassle-free Returns", desc: "Simple refund policy in place" },
            { icon: Headphones, label: "24/7 Expert Support", desc: "Talk to real people anytime" },
          ].map(({ icon: Icon, label, desc }, i) => (
            <div key={label} className="text-center group">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-sm group-hover:bg-indigo-600">
                <Icon className="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-black text-lg text-foreground mb-2">{label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed px-4">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
