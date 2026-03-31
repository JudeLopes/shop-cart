import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/data/mockData";
import toast from "react-hot-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, phone: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (name: string, phone: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("shop_user");
    if (stored) setUser(JSON.parse(stored));
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.msg || "Login failed");
        return false;
      }
      
      const userData = await res.json();
      setUser(userData);
      localStorage.setItem("shop_user", JSON.stringify(userData));
      toast.success(`Welcome back, ${userData.full_name || userData.name}!`);
      return true;
    } catch (err) {
      toast.error("Server connection error");
      return false;
    }
  };

  const register = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: name, email, phone, password })
      });
      
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.msg || "Registration failed");
        return false;
      }
      
      const userData = await res.json();
      setUser(userData);
      localStorage.setItem("shop_user", JSON.stringify(userData));
      toast.success("Account created successfully!");
      return true;
    } catch (err) {
      toast.error("Server connection error");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("shop_user");
    toast.success("Logged out");
  };

  const updateProfile = (name: string, phone: string) => {
    if (user) {
      const updated = { ...user, full_name: name, name, phone };
      setUser(updated);
      localStorage.setItem("shop_user", JSON.stringify(updated));
      toast.success("Profile updated!");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login: login as any, register: register as any, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
