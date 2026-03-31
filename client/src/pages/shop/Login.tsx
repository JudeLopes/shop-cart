import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Invalid email";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Min 6 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (login(email, password)) navigate("/");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-card rounded-xl border border-border shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-1">Welcome Back</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">Sign in to your account</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full border border-input rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" placeholder="you@example.com" />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative mt-1">
              <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-input rounded-lg px-3 py-2.5 pr-10 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" placeholder="••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity">Sign In</button>
        </form>
        <p className="text-sm text-center mt-4 text-muted-foreground">
          Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline">Sign Up</Link>
        </p>
        <p className="text-xs text-center mt-3 text-muted-foreground">Demo: Use admin@shop.com for admin access, or any email for customer.</p>
      </div>
    </div>
  );
};

export default Login;
