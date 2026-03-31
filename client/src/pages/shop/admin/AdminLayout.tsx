import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Users, ArrowLeft } from "lucide-react";

const adminLinks = [
  { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/products", icon: Package, label: "Products" },
  { path: "/admin/orders", icon: ShoppingCart, label: "Orders" },
  { path: "/admin/users", icon: Users, label: "Users" },
];

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <aside className="w-60 bg-card border-r border-border p-4 hidden md:block">
        <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>
        <nav className="space-y-1">
          {adminLinks.map(({ path, icon: Icon, label }) => (
            <Link key={path} to={path} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${location.pathname === path ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
              <Icon className="w-4 h-4" /> {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        {/* Mobile nav */}
        <div className="flex gap-2 mb-6 md:hidden overflow-x-auto">
          {adminLinks.map(({ path, label }) => (
            <Link key={path} to={path} className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium ${location.pathname === path ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {label}
            </Link>
          ))}
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
