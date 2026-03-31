import { useState } from "react";
import { mockUsers, User } from "@/data/mockData";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const toggleActive = (userId: number) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, is_active: !u.is_active } : u));
    toast.success("User status updated");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Phone</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Role</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Joined</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-t border-border hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium">{u.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{u.email}</td>
                  <td className="py-3 px-4 text-muted-foreground">{u.phone}</td>
                  <td className="py-3 px-4"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${u.role === "admin" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>{u.role}</span></td>
                  <td className="py-3 px-4"><span className={`text-xs font-semibold ${u.is_active ? "text-success" : "text-destructive"}`}>{u.is_active ? "Active" : "Inactive"}</span></td>
                  <td className="py-3 px-4 text-muted-foreground">{u.created_at}</td>
                  <td className="py-3 px-4">
                    <button onClick={() => toggleActive(u.id)} className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${u.is_active ? "bg-destructive/10 text-destructive hover:bg-destructive/20" : "bg-success/10 text-success hover:bg-success/20"}`}>
                      {u.is_active ? "Deactivate" : "Activate"}
                    </button>
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

export default ManageUsers;
