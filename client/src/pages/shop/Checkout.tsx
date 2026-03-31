import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { MapPin, CreditCard, CheckCircle2, ShieldCheck, Loader2, Plus, Home as HomeIcon } from "lucide-react";
import toast from "react-hot-toast";

const Checkout = () => {
  const { items, clearCart, total, subtotal, discount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({ label: "Home", line1: "", line2: "", city: "", state: "", pincode: "" });

  useEffect(() => {
    if (!user) return navigate("/login");
    fetchAddresses();
  }, [user]);

  const fetchAddresses = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/addresses/${user?.user_id || user?.id}`);
      const data = await res.json();
      setAddresses(data);
      if (data.length > 0) setSelectedAddress(data[0].address_id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newAddr, user_id: user?.user_id || user?.id, is_default: addresses.length === 0 ? 1 : 0 })
      });
      if (!res.ok) throw new Error();
      toast.success("Address saved!");
      setShowAddAddress(false);
      fetchAddresses();
    } catch (err) {
      toast.error("Failed to save address");
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) return toast.error("Please select a delivery address");
    setIsProcessing(true);
    
    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user?.user_id || user?.id,
          address_id: selectedAddress,
          payment_method: paymentMethod,
          discount_amount: discount,
          final_amount: total
        })
      });
      
      const result = await res.json();
      if (!res.ok) throw new Error(result.msg || "Order failed");
      
      setIsSuccess(true);
      clearCart();
      toast.success("Order placed successfully!");
      setTimeout(() => navigate("/orders"), 3000);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center gap-4">
      <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      <p className="text-muted-foreground font-medium italic">Preparing secure checkout...</p>
    </div>
  );

  if (isSuccess) return (
    <div className="container mx-auto px-4 py-32 flex flex-col items-center text-center">
      <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <CheckCircle2 className="w-12 h-12 text-emerald-600" />
      </div>
      <h2 className="text-4xl font-black text-foreground mb-4">Transaction Confirmed!</h2>
      <p className="text-muted-foreground font-medium mb-8 max-w-md">Your order has been processed and your inventory is reserved. Redirecting to your order history...</p>
      <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-foreground mb-12 flex items-center gap-4">
        <ShieldCheck className="w-8 h-8 text-indigo-600" /> Secure Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Address Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black flex items-center gap-3">
                <MapPin className="w-5 h-5 text-indigo-600" /> 1. Delivery Address
              </h2>
              {!showAddAddress && (
                <button onClick={() => setShowAddAddress(true)} className="flex items-center gap-2 text-sm font-black text-indigo-600 hover:text-indigo-700">
                  <Plus className="w-4 h-4" /> NEW ADDRESS
                </button>
              )}
            </div>

            {showAddAddress ? (
              <form onSubmit={handleAddAddress} className="bg-card border-2 border-dashed border-indigo-200 p-8 rounded-3xl space-y-4">
                <div className="grid grid-cols-2 gap-4">
                   <input required value={newAddr.label} onChange={e => setNewAddr({...newAddr, label: e.target.value})} placeholder="Label (Home/Work)" className="p-4 rounded-xl border border-border bg-background font-medium outline-none focus:ring-2 focus:ring-indigo-600" />
                   <input required value={newAddr.pincode} onChange={e => setNewAddr({...newAddr, pincode: e.target.value})} placeholder="Pincode" className="p-4 rounded-xl border border-border bg-background font-medium outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
                <input required value={newAddr.line1} onChange={e => setNewAddr({...newAddr, line1: e.target.value})} placeholder="House No / Street" className="w-full p-4 rounded-xl border border-border bg-background font-medium outline-none focus:ring-2 focus:ring-indigo-600" />
                <div className="grid grid-cols-2 gap-4">
                   <input required value={newAddr.city} onChange={e => setNewAddr({...newAddr, city: e.target.value})} placeholder="City" className="p-4 rounded-xl border border-border bg-background font-medium outline-none focus:ring-2 focus:ring-indigo-600" />
                   <input required value={newAddr.state} onChange={e => setNewAddr({...newAddr, state: e.target.value})} placeholder="State" className="p-4 rounded-xl border border-border bg-background font-medium outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
                <div className="flex gap-4 pt-4">
                   <button type="submit" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-black shadow-lg">SAVE ADDRESS</button>
                   <button type="button" onClick={() => setShowAddAddress(false)} className="px-8 py-3 rounded-xl font-black text-muted-foreground">CANCEL</button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map(addr => (
                  <button 
                    key={addr.address_id} 
                    onClick={() => setSelectedAddress(addr.address_id)} 
                    className={`text-left p-6 rounded-[32px] border-2 transition-all relative overflow-hidden group ${selectedAddress === addr.address_id ? "border-indigo-600 bg-indigo-50/50 shadow-xl" : "border-border hover:border-indigo-200"}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-xl ${selectedAddress === addr.address_id ? "bg-indigo-600 text-white" : "bg-muted text-muted-foreground"}`}>
                        <HomeIcon className="w-4 h-4" />
                      </div>
                      <span className="font-black uppercase tracking-widest text-xs">{addr.label}</span>
                    </div>
                    <p className="font-bold text-foreground text-sm line-clamp-1">{addr.line1}</p>
                    <p className="text-muted-foreground font-medium text-sm">{addr.city}, {addr.pincode}</p>
                    {selectedAddress === addr.address_id && (
                      <div className="absolute top-4 right-4 text-indigo-600"><CheckCircle2 className="w-6 h-6" /></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Payment Section */}
          <section>
            <h2 className="text-xl font-black mb-6 flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-indigo-600" /> 2. Payment Method
            </h2>
            <div className="grid grid-cols-3 gap-6">
              {["Credit Card", "UPI / Wallet", "Cash on Delivery"].map(method => (
                <button 
                  key={method} 
                  onClick={() => setPaymentMethod(method)} 
                  className={`p-6 rounded-3xl border-2 transition-all font-black text-sm text-center ${paymentMethod === method ? "border-indigo-600 bg-indigo-600 text-white shadow-xl shadow-indigo-600/20" : "border-border hover:bg-muted"}`}
                >
                  {method}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Order Summary Summary */}
        <aside className="lg:col-span-1">
          <div className="bg-card border border-border p-8 rounded-[40px] shadow-2xl sticky top-24">
            <h2 className="text-2xl font-black mb-8">Summary</h2>
            <div className="space-y-4 mb-8">
               <div className="flex justify-between font-bold text-muted-foreground"><span>Subtotal ({items.length} items)</span><span>₹{subtotal.toLocaleString()}</span></div>
               {discount > 0 && <div className="flex justify-between font-bold text-emerald-600"><span>Coupon Applied</span><span>-₹{discount.toLocaleString()}</span></div>}
               <div className="flex justify-between font-bold text-muted-foreground"><span>Shipping</span><span className="text-emerald-600">FREE</span></div>
               <hr className="border-border my-2" />
               <div className="flex justify-between items-center">
                 <span className="text-lg font-black uppercase tracking-widest">Grand Total</span>
                 <span className="text-3xl font-black text-indigo-600">₹{total.toLocaleString()}</span>
               </div>
            </div>

            <button 
              onClick={handlePlaceOrder} 
              disabled={isProcessing || items.length === 0} 
              className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:grayscale"
            >
              {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : <><ShieldCheck className="w-6 h-6" /> PLACE REAL ORDER</>}
            </button>
            
            <p className="text-[10px] text-center text-muted-foreground font-black uppercase tracking-[0.2em] mt-6">
              Encrypted SSL Transaction — NO DATA STORED
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
