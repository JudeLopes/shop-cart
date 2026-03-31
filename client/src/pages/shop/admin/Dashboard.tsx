import { products, mockOrders, mockUsers } from "@/data/mockData";
import { Users, ShoppingCart, DollarSign, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const chartData = [
  { day: "Mon", orders: 12 },
  { day: "Tue", orders: 19 },
  { day: "Wed", orders: 8 },
  { day: "Thu", orders: 15 },
  { day: "Fri", orders: 22 },
  { day: "Sat", orders: 30 },
  { day: "Sun", orders: 18 },
];

const Dashboard = () => {
  const totalRevenue = mockOrders.reduce((s, o) => s + o.total, 0);
  const lowStock = products.filter(p => p.stock < 15);

  const stats = [
    { icon: Users, label: "Total Users", value: mockUsers.length, color: "text-primary" },
    { icon: ShoppingCart, label: "Total Orders", value: mockOrders.length, color: "text-success" },
    { icon: DollarSign, label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, color: "text-warning" },
    { icon: AlertTriangle, label: "Low Stock", value: lowStock.length, color: "text-destructive" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{label}</span>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-5">
          <h2 className="font-semibold mb-4">Orders This Week</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ borderRadius: "0.5rem", border: "1px solid hsl(var(--border))" }} />
              <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h2 className="font-semibold mb-4">Low Stock Products</h2>
          <div className="space-y-3">
            {lowStock.map(p => (
              <div key={p.id} className="flex items-center justify-between text-sm">
                <span>{p.name}</span>
                <span className={`font-semibold ${p.stock < 10 ? "text-destructive" : "text-warning"}`}>{p.stock} left</span>
              </div>
            ))}
            {lowStock.length === 0 && <p className="text-sm text-muted-foreground">All products are well stocked!</p>}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-5 mt-6">
        <h2 className="font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-muted-foreground font-medium">Order ID</th>
                <th className="text-left py-2 text-muted-foreground font-medium">Date</th>
                <th className="text-left py-2 text-muted-foreground font-medium">Total</th>
                <th className="text-left py-2 text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map(o => (
                <tr key={o.id} className="border-b border-border last:border-0">
                  <td className="py-3 font-medium">#{o.id}</td>
                  <td className="py-3 text-muted-foreground">{o.ordered_at}</td>
                  <td className="py-3">₹{o.total.toLocaleString()}</td>
                  <td className="py-3"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${o.status === "delivered" ? "bg-success/20 text-success" : o.status === "shipped" ? "bg-primary/20 text-primary" : o.status === "cancelled" ? "bg-destructive/20 text-destructive" : "bg-warning/20 text-warning"}`}>{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
