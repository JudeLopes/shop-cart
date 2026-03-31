import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useState } from "react";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, subtotal, discount, total, appliedCoupon, applyCoupon, removeCoupon } = useCart();
  const [couponCode, setCouponCode] = useState("");

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Start adding items to your cart</p>
        <Link to="/products" className="bg-primary text-primary-foreground font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Shopping Cart ({items.length} items)</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.product_id} className="bg-card rounded-xl border border-border p-4 flex gap-4">
              <Link to={`/product/${item.product_id}`}>
                <img src={item.product.image_url} alt={item.product.name} className="w-24 h-24 object-cover rounded-lg" />
              </Link>
              <div className="flex-1">
                <Link to={`/product/${item.product_id}`} className="font-semibold text-foreground hover:text-primary transition-colors">{item.product.name}</Link>
                <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                <p className="font-bold text-foreground mt-1">₹{item.product.effective_price.toLocaleString()}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => removeFromCart(item.product_id)} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                <div className="flex items-center border border-border rounded-lg">
                  <button onClick={() => updateQuantity(item.product_id, item.quantity - 1)} className="p-1.5 hover:bg-muted transition-colors"><Minus className="w-3 h-3" /></button>
                  <span className="px-3 text-sm font-medium">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product_id, item.quantity + 1)} className="p-1.5 hover:bg-muted transition-colors"><Plus className="w-3 h-3" /></button>
                </div>
                <span className="text-sm font-semibold">₹{(item.product.effective_price * item.quantity).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl border border-border p-6 h-fit sticky top-20">
          <h2 className="font-bold text-lg mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
            {discount > 0 && <div className="flex justify-between text-success"><span>Discount</span><span>-₹{Math.round(discount).toLocaleString()}</span></div>}
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-success">Free</span></div>
            <hr className="border-border" />
            <div className="flex justify-between font-bold text-lg"><span>Total</span><span>₹{Math.round(total).toLocaleString()}</span></div>
          </div>

          <div className="mt-4">
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-success/10 text-success text-sm px-3 py-2 rounded-lg">
                <span>Coupon: {appliedCoupon}</span>
                <button onClick={removeCoupon} className="text-xs underline">Remove</button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input value={couponCode} onChange={e => setCouponCode(e.target.value)} placeholder="Coupon code" className="flex-1 border border-input rounded-lg px-3 py-2 text-sm bg-background" />
                <button onClick={() => { applyCoupon(couponCode); setCouponCode(""); }} className="bg-foreground text-card text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">Apply</button>
              </div>
            )}
          </div>

          <Link to="/checkout" className="block mt-4 w-full text-center bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
