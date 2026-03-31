import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground text-card mt-auto">
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-3">ShopCart</h3>
          <p className="text-sm opacity-70">Your one-stop shop for everything. Quality products at the best prices.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <Link to="/products" className="hover:opacity-100 transition-opacity">All Products</Link>
            <Link to="/orders" className="hover:opacity-100 transition-opacity">My Orders</Link>
            <Link to="/wishlist" className="hover:opacity-100 transition-opacity">Wishlist</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Categories</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <Link to="/products?category=5" className="hover:opacity-100 transition-opacity">Smartphones</Link>
            <Link to="/products?category=6" className="hover:opacity-100 transition-opacity">Laptops</Link>
            <Link to="/products?category=8" className="hover:opacity-100 transition-opacity">Fashion</Link>
            <Link to="/products?category=4" className="hover:opacity-100 transition-opacity">Books</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <div className="text-sm opacity-70 space-y-2">
            <p>support@shopcart.com</p>
            <p>1-800-SHOP-CART</p>
            <p>Mon-Sat, 9am - 8pm</p>
          </div>
        </div>
      </div>
      <div className="border-t border-card/20 mt-8 pt-6 text-center text-sm opacity-50">
        © 2024 ShopCart. All rights reserved. For educational use only.
      </div>
    </div>
  </footer>
);

export default Footer;
