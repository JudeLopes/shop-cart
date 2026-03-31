import { useState } from "react";
import { mockOrders, Order } from "@/data/mockData";
import toast from "react-hot-toast";

const statusOptions = ["pending", "shipped", "delivered", "cancelled"] as const;
const statusColors: Record<string, string> = {
  pending: "bg-warning/20 text-warning",
  shipped: "bg-primary/20 text-primary",
  delivered: "bg-success/20 text-success",
  cancelled: "bg-destructive/20 text-destructive",
};

const ManageOrders = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = statusFilter ? orders.filter(o => o.status === statusFilter) : orders;

  const updateStatus = (orderId: number, newStatus: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus as Order["status"] } : o));
    toast.success(`Order #${orderId} updated to ${newStatus}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Orders</h1>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-input rounded-lg px-3 py-2 text-sm bg-card">
          <option value="">All Status</option>
          {statusOptions.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Order ID</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Items</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Total</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Payment</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id} className="border-t border-border hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium">#{o.id}</td>
                  <td className="py-3 px-4 text-muted-foreground">{o.ordered_at}</td>
                  <td className="py-3 px-4">{o.items.length}</td>
                  <td className="py-3 px-4">₹{o.total.toLocaleString()}</td>
                  <td className="py-3 px-4"><span className={`text-xs font-semibold ${o.payment_status === "paid" ? "text-success" : "text-warning"}`}>{o.payment_status}</span></td>
                  <td className="py-3 px-4"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[o.status]}`}>{o.status}</span></td>
                  <td className="py-3 px-4">
                    <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)} className="border border-input rounded px-2 py-1 text-xs bg-background">
                      {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
