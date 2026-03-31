import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Package, ChevronDown, ChevronUp, Loader2 } from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-sky-100 text-sky-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-rose-100 text-rose-700",
};

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;
    
    fetch(`http://localhost:5000/api/orders/${user.user_id || user.id}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  if (loading) return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center gap-4">
      <Loader2 className="w-10 h-10 text-primary animate-spin" />
      <p className="text-muted-foreground font-medium">Fetching your order history...</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-extrabold text-foreground mb-8 flex items-center gap-3">
        <Package className="w-8 h-8 text-indigo-600" /> My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-24 bg-card rounded-3xl border-2 border-dashed border-border">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
          <p className="text-xl font-medium text-muted-foreground">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.order_id} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden hover:border-border/80 transition-all">
              <button 
                onClick={() => setExpandedOrder(expandedOrder === order.order_id ? null : order.order_id)} 
                className="w-full p-6 flex flex-wrap items-center justify-between text-left hover:bg-muted/30 transition-colors gap-4"
              >
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-lg text-foreground">Order ID: #{order.order_id}</span>
                    <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${statusColors[order.status] || "bg-muted"}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {new Date(order.ordered_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} · {order.items?.length || 0} item(s)
                  </p>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Total Amount</p>
                    <p className="text-xl font-black text-indigo-600">₹{Number(order.final_amount).toLocaleString()}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    {expandedOrder === order.order_id ? <ChevronUp className="w-5 h-5 text-indigo-600" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                  </div>
                </div>
              </button>
              
              {expandedOrder === order.order_id && (
                <div className="border-t border-border bg-muted/10 p-6 space-y-4">
                  {order.items?.map((item: any) => (
                    <div key={item.product_id} className="flex items-center gap-5 bg-card p-3 rounded-xl border border-border/50 shadow-sm">
                      <img src={item.image_url || "https://via.placeholder.com/150"} alt={item.name} className="w-20 h-20 rounded-lg object-cover bg-white" />
                      <div className="flex-1">
                        <p className="text-base font-bold text-foreground mb-1">{item.name}</p>
                        <p className="text-sm text-muted-foreground font-medium">Quantity: {item.quantity} · Rate: ₹{Number(item.unit_price).toLocaleString()}</p>
                      </div>
                      <div className="text-right pr-2">
                        <p className="text-sm font-black text-foreground">₹{(item.unit_price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-6 p-4 rounded-xl bg-indigo-600/5 border border-indigo-600/20 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">Payment</p>
                        <span className="text-sm font-bold uppercase text-foreground bg-white px-3 py-1 rounded-md border border-border">{order.payment_method}</span>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">Status</p>
                        <span className={`text-sm font-bold uppercase px-3 py-1 rounded-md border border-border bg-white ${order.payment_status === 'paid' ? 'text-emerald-600' : 'text-amber-600'}`}>{order.payment_status}</span>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex justify-between gap-8 text-sm text-muted-foreground font-medium">
                        <span>Items Subtotal</span>
                        <span>₹{Number(order.total_amount).toLocaleString()}</span>
                      </div>
                      {Number(order.discount_amount) > 0 && (
                        <div className="flex justify-between gap-8 text-sm text-emerald-600 font-bold">
                          <span>Coupon Discount</span>
                          <span>-₹{Number(order.discount_amount).toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between gap-8 pt-2 border-t">
                        <span className="text-lg font-black uppercase tracking-widest text-foreground">Final Total</span>
                        <span className="text-3xl font-black text-indigo-700">₹{Number(order.final_amount).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
