import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Phone, MapPin, Package, Settings, Loader2, Home as HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/api/addresses/${user.user_id || user.id}`)
        .then(res => res.json())
        .then(data => {
          setAddresses(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  if (!user) return (
    <div className="container mx-auto px-4 py-32 text-center">
      <h2 className="text-3xl font-black mb-4">Please log in to view your profile</h2>
      <Link to="/login" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold">Login</Link>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* User Card */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border p-8 rounded-[40px] shadow-xl text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-24 bg-indigo-600/10" />
             <div className="relative mt-8">
               <div className="w-24 h-24 bg-indigo-600 text-white rounded-[32px] flex items-center justify-center mx-auto text-4xl font-black shadow-2xl shadow-indigo-500/30 mb-6">
                 {user.full_name?.charAt(0) || user.name?.charAt(0)}
               </div>
               <h1 className="text-2xl font-black text-foreground mb-2">{user.full_name || user.name}</h1>
               <p className="text-indigo-600 font-bold text-xs uppercase tracking-widest">{user.role || "Customer"}</p>
             </div>

             <div className="mt-10 space-y-4 text-left">
               <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl">
                 <Mail className="w-5 h-5 text-indigo-600" />
                 <div><p className="text-[10px] font-black uppercase text-muted-foreground">Email Address</p><p className="font-bold text-sm">{user.email}</p></div>
               </div>
               <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl">
                 <Phone className="w-5 h-5 text-indigo-600" />
                 <div><p className="text-[10px] font-black uppercase text-muted-foreground">Phone Number</p><p className="font-bold text-sm">{user.phone || "Not provided"}</p></div>
               </div>
             </div>
             
             <button className="w-full mt-8 border border-border py-4 rounded-2xl font-black text-sm hover:bg-muted transition-colors">EDIT PROFILE</button>
          </div>
        </div>

        {/* Addresses & Stats */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-card border border-border p-10 rounded-[40px] shadow-sm">
             <div className="flex items-center justify-between mb-8">
               <h2 className="text-2xl font-black flex items-center gap-4"><MapPin className="w-6 h-6 text-indigo-600" /> Delivery Destinations</h2>
               <Link to="/checkout" className="text-indigo-600 font-black text-sm">+ ADD NEW</Link>
             </div>
             
             {loading ? (
               <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 text-indigo-100 animate-spin" /></div>
             ) : addresses.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {addresses.map(addr => (
                   <div key={addr.address_id} className="p-6 rounded-3xl border border-border hover:border-indigo-200 transition-colors group">
                     <div className="flex items-center gap-3 mb-4">
                       <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600"><HomeIcon className="w-4 h-4" /></div>
                       <span className="font-black text-xs uppercase tracking-widest">{addr.label}</span>
                       {addr.is_default && <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded ml-auto">DEFAULT</span>}
                     </div>
                     <p className="font-bold text-foreground text-sm leading-relaxed">{addr.line1}</p>
                     <p className="text-muted-foreground text-sm font-medium">{addr.city}, {addr.pincode}</p>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="text-center py-10 border-2 border-dashed border-border rounded-3xl">
                 <p className="text-muted-foreground font-medium italic">No addresses saved yet.</p>
               </div>
             )}
           </div>

           <div className="grid grid-cols-2 gap-8">
             <Link to="/orders" className="bg-indigo-600 p-8 rounded-[40px] text-white shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all group">
               <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Package className="w-6 h-6" /></div>
               <h3 className="text-2xl font-black leading-tight">Order<br />History</h3>
               <p className="text-indigo-100 text-sm mt-2 opacity-70">Track your real database orders</p>
             </Link>
             
             <div className="bg-white p-8 rounded-[40px] border border-border shadow-sm group cursor-pointer hover:border-indigo-600 transition-all">
               <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all"><Settings className="w-6 h-6" /></div>
               <h3 className="text-2xl font-black leading-tight">Account<br />Settings</h3>
               <p className="text-muted-foreground text-sm mt-2 font-medium">Manage security & preferences</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
