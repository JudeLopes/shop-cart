import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/shop/ProductCard";
import { Filter, Search, SortAsc, LayoutGrid, Loader2 } from "lucide-react";

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

  const currentCategory = searchParams.get("category");
  const searchTerm = searchParams.get("search");

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

  const filteredProducts = products.filter(p => {
    const matchesCategory = !currentCategory || p.category_id === Number(currentCategory);
    const matchesSearch = !searchTerm || 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.brand?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.effective_price - b.effective_price;
    if (sortBy === "price-high") return b.effective_price - a.effective_price;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return b.product_id - a.product_id;
  });

  if (loading) return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center gap-4 text-center">
      <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      <div className="space-y-2">
        <h3 className="text-xl font-black text-foreground">Fetching Premium Products</h3>
        <p className="text-muted-foreground font-medium animate-pulse">Syncing with our regional database...</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-black uppercase tracking-tight">Categories</h2>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => { searchParams.delete("category"); setSearchParams(searchParams); }}
                className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all text-sm ${!currentCategory ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "hover:bg-muted text-muted-foreground"}`}
              >
                All Products
              </button>
              {categories.map(cat => (
                <button
                  key={cat.category_id}
                  onClick={() => { searchParams.set("category", cat.category_id.toString()); setSearchParams(searchParams); }}
                  className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all text-sm ${currentCategory === cat.category_id.toString() ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "hover:bg-muted text-muted-foreground"}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 bg-card p-6 rounded-3xl border border-border shadow-sm">
            <div>
              <h1 className="text-2xl font-black text-foreground flex items-center gap-3">
                <LayoutGrid className="w-6 h-6 text-indigo-600" />
                {searchTerm ? `Search: "${searchTerm}"` : (categories.find(c => c.category_id.toString() === currentCategory)?.name || "All Collections")}
              </h1>
              <p className="text-sm text-muted-foreground font-medium mt-1">Showing {filteredProducts.length} authenticated items</p>
            </div>
            
            <div className="flex items-center gap-4">
              <label htmlFor="sort" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Sort By</label>
              <select 
                id="sort"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-background border border-border rounded-xl px-4 py-2 text-sm font-bold focus:ring-2 focus:ring-indigo-600 focus:outline-none cursor-pointer"
              >
                <option value="newest">New Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(p => (
                <ProductCard key={p.product_id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-indigo-50/50 rounded-[40px] border-2 border-dashed border-indigo-200">
              <Search className="w-16 h-16 text-indigo-300 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-indigo-900 mb-2">No matching products</h3>
              <p className="text-indigo-700/60 font-medium">Try adjusting your filters or search terms.</p>
              <button 
                onClick={() => setSearchParams({})}
                className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductList;
