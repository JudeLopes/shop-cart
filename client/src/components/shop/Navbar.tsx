import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, User, LogOut, Shield, Menu, X, Heart } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?search=${encodeURIComponent(search.trim())}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link to="/" className="text-primary-foreground font-bold text-xl shrink-0">
            ShopCart
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products, brands..."
                className="w-full rounded-lg py-2 pl-4 pr-10 text-sm text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/wishlist" className="text-primary-foreground hover:opacity-80 transition-opacity p-2">
              <Heart className="w-5 h-5" />
            </Link>

            <Link to="/cart" className="relative text-primary-foreground hover:opacity-80 transition-opacity p-2">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 text-primary-foreground hover:opacity-80 transition-opacity p-2">
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">{(user.full_name || user.name || "User").split(" ")[0]}</span>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-card rounded-xl shadow-lg border border-border py-2 z-50">
                    <Link to="/profile" onClick={() => setProfileOpen(false)} className="block px-4 py-2 text-sm hover:bg-muted transition-colors">My Profile</Link>
                    <Link to="/orders" onClick={() => setProfileOpen(false)} className="block px-4 py-2 text-sm hover:bg-muted transition-colors">My Orders</Link>
                    {user.role === "admin" && (
                      <Link to="/admin" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors">
                        <Shield className="w-3 h-3" /> Admin Panel
                      </Link>
                    )}
                    <hr className="my-1 border-border" />
                    <button onClick={() => { logout(); setProfileOpen(false); navigate("/"); }} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors">
                      <LogOut className="w-3 h-3" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-card text-primary font-medium text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Login
              </Link>
            )}
          </div>

          <button className="md:hidden text-primary-foreground p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <form onSubmit={handleSearch}>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="w-full rounded-lg py-2 px-4 text-sm text-foreground bg-card" />
            </form>
            <div className="flex flex-col gap-1">
              <Link to="/products" onClick={() => setMenuOpen(false)} className="text-primary-foreground py-2 px-2 hover:opacity-80">Products</Link>
              <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="text-primary-foreground py-2 px-2 hover:opacity-80">Wishlist</Link>
              <Link to="/cart" onClick={() => setMenuOpen(false)} className="text-primary-foreground py-2 px-2 hover:opacity-80 flex items-center gap-2">
                Cart {cartCount > 0 && <span className="bg-destructive text-destructive-foreground text-xs rounded-full px-2 py-0.5">{cartCount}</span>}
              </Link>
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="text-primary-foreground py-2 px-2 hover:opacity-80">Profile</Link>
                  <Link to="/orders" onClick={() => setMenuOpen(false)} className="text-primary-foreground py-2 px-2 hover:opacity-80">Orders</Link>
                  {user.role === "admin" && <Link to="/admin" onClick={() => setMenuOpen(false)} className="text-primary-foreground py-2 px-2 hover:opacity-80">Admin Panel</Link>}
                  <button onClick={() => { logout(); setMenuOpen(false); }} className="text-left text-primary-foreground py-2 px-2 hover:opacity-80">Logout</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMenuOpen(false)} className="text-primary-foreground py-2 px-2 hover:opacity-80">Login</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
