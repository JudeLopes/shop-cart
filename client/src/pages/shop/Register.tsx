import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone)) errs.phone = "Must be 10 digits";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "Min 6 characters";
    if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords don't match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (register(form.name, form.email, form.phone, form.password)) navigate("/");
  };

  const update = (field: string, value: string) => setForm({ ...form, [field]: value });

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="bg-card rounded-xl border border-border shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-1">Create Account</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">Join ShopCart today</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { field: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
            { field: "email", label: "Email", type: "email", placeholder: "you@example.com" },
            { field: "phone", label: "Phone", type: "tel", placeholder: "9876543210" },
            { field: "password", label: "Password", type: "password", placeholder: "••••••" },
            { field: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "••••••" },
          ].map(({ field, label, type, placeholder }) => (
            <div key={field}>
              <label className="text-sm font-medium">{label}</label>
              <input type={type} value={form[field as keyof typeof form]} onChange={e => update(field, e.target.value)} className="mt-1 w-full border border-input rounded-lg px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" placeholder={placeholder} />
              {errors[field] && <p className="text-xs text-destructive mt-1">{errors[field]}</p>}
            </div>
          ))}
          <button type="submit" className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity">Create Account</button>
        </form>
        <p className="text-sm text-center mt-4 text-muted-foreground">
          Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
