import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem, Product, products as allProducts, coupons } from "@/data/mockData";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: any, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  total: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [discount, setDiscount] = useState(0);

  const fetchCart = async (userId: number) => {
    try {
      const res = await fetch(`http://localhost:5000/api/cart/${userId}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      
      const dbItems = data.map((item: any) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        product: {
          id: item.product_id,
          product_id: item.product_id,
          name: item.product_name,
          brand: item.brand,
          effective_price: item.unit_price,
          image_url: item.image_url,
          price: item.unit_price
        }
      }));
      setItems(dbItems);
    } catch (err) {
      console.error("Cart fetch error", err);
    }
  };

  useEffect(() => {
    if (user) fetchCart(user.user_id || user.id);
    else setItems([]);
  }, [user]);

  const checkCoupon = async (code: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/coupons/${code}`);
      if (!res.ok) throw new Error("Invalid coupon");
      const coupon = await res.json();
      
      const st = items.reduce((acc, item) => acc + (item.product.effective_price || item.product.price) * item.quantity, 0);

      if (st < Number(coupon.min_order_amt)) {
        toast.error(`Coupon needs minimum order of ₹${coupon.min_order_amt}`);
        return;
      }

      let discountVal = 0;
      if (coupon.discount_type === "percent") {
        discountVal = (st * Number(coupon.discount_val)) / 100;
      } else if (coupon.discount_type === "flat") {
        discountVal = Number(coupon.discount_val);
      }

      setAppliedCoupon(coupon.code);
      setDiscount(discountVal);
      toast.success(`Coupon "${code}" applied! Save ₹${discountVal.toFixed(2)}`);
    } catch (err) {
      toast.error("Invalid or expired coupon");
      setAppliedCoupon(null);
      setDiscount(0);
    }
  };

  const addToCart = async (product: any, quantity: number = 1) => {
    const userId = user?.user_id || user?.id;
    if (!userId) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, product_id: product.product_id || product.id, quantity }),
      });
      if (!res.ok) throw new Error();
      toast.success("Added to cart");
      fetchCart(userId);
    } catch (err) {
      toast.error("Cart sync failed");
    }
  };

  const removeFromCart = async (productId: number) => {
    const userId = user?.user_id || user?.id;
    if (!userId) return;

    try {
      const res = await fetch(`http://localhost:5000/api/cart/${userId}/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      toast.success("Removed from cart");
      fetchCart(userId);
    } catch (err) {
      toast.error("Cart update failed");
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    const userId = user?.user_id || user?.id;
    if (!userId || quantity < 1) return;

    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, product_id: productId, quantity }),
      });
      if (!res.ok) throw new Error();
      fetchCart(userId);
    } catch (err) {
      toast.error("Quantity update failed");
    }
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    setDiscount(0);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
  };

  const subtotal = items.reduce((acc, item) => acc + (item.product.effective_price || item.product.price) * item.quantity, 0);
  const total = subtotal - discount;
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      items, addToCart, removeFromCart, updateQuantity, clearCart, 
      cartCount, subtotal, discount, total, appliedCoupon, 
      applyCoupon: (code) => { checkCoupon(code); return true; }, 
      removeCoupon 
    }}>
      {children}
    </CartContext.Provider>
  );
};
