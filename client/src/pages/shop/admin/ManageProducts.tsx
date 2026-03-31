import { useState } from "react";
import { products as allProducts, Product, categories } from "@/data/mockData";
import { Search, Plus, Edit2, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";

const ManageProducts = () => {
  const [productList, setProductList] = useState<Product[]>(allProducts);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: "", brand: "", category_id: 5, price: 0, discount_pct: 0, stock: 0, description: "" });

  const filtered = productList.filter(p => p.is_active && (p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())));

  const openAdd = () => {
    setEditingProduct(null);
    setForm({ name: "", brand: "", category_id: 5, price: 0, discount_pct: 0, stock: 0, description: "" });
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditingProduct(p);
    setForm({ name: p.name, brand: p.brand, category_id: p.category_id, price: p.price, discount_pct: p.discount_pct, stock: p.stock, description: p.description });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name || !form.brand || !form.price) { toast.error("Fill required fields"); return; }
    if (editingProduct) {
      setProductList(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...form, effective_price: form.price * (1 - form.discount_pct / 100) } : p));
      toast.success("Product updated");
    } else {
      const newP: Product = { id: Date.now(), ...form, category_name: "Category", effective_price: form.price * (1 - form.discount_pct / 100), image_url: "https://via.placeholder.com/300", images: ["https://via.placeholder.com/300"], avg_rating: 0, review_count: 0, is_active: true };
      setProductList(prev => [newP, ...prev]);
      toast.success("Product added");
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this product?")) {
      setProductList(prev => prev.map(p => p.id === id ? { ...p, is_active: false } : p));
      toast.success("Product deleted");
    }
  };

  const allCats = categories.flatMap(c => [c, ...(c.children || [])]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <button onClick={openAdd} className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity"><Plus className="w-4 h-4" /> Add Product</button>
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg text-sm bg-card" />
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Product</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Brand</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Price</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Stock</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-t border-border hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium">{p.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{p.brand}</td>
                  <td className="py-3 px-4">₹{p.effective_price.toLocaleString()} {p.discount_pct > 0 && <span className="text-xs text-success">(-{p.discount_pct}%)</span>}</td>
                  <td className="py-3 px-4"><span className={p.stock < 10 ? "text-destructive font-semibold" : ""}>{p.stock}</span></td>
                  <td className="py-3 px-4 flex gap-2">
                    <button onClick={() => openEdit(p)} className="p-1.5 rounded hover:bg-muted transition-colors"><Edit2 className="w-4 h-4 text-primary" /></button>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded hover:bg-muted transition-colors"><Trash2 className="w-4 h-4 text-destructive" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setShowModal(false)} />
          <div className="relative bg-card rounded-xl border border-border p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">{editingProduct ? "Edit Product" : "Add Product"}</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Product Name *" className="w-full border border-input rounded-lg px-3 py-2.5 text-sm bg-background" />
              <input value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} placeholder="Brand *" className="w-full border border-input rounded-lg px-3 py-2.5 text-sm bg-background" />
              <select value={form.category_id} onChange={e => setForm({ ...form, category_id: +e.target.value })} className="w-full border border-input rounded-lg px-3 py-2.5 text-sm bg-background">
                {allCats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <div className="grid grid-cols-3 gap-3">
                <input type="number" value={form.price} onChange={e => setForm({ ...form, price: +e.target.value })} placeholder="Price *" className="border border-input rounded-lg px-3 py-2.5 text-sm bg-background" />
                <input type="number" value={form.discount_pct} onChange={e => setForm({ ...form, discount_pct: +e.target.value })} placeholder="Discount %" className="border border-input rounded-lg px-3 py-2.5 text-sm bg-background" />
                <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: +e.target.value })} placeholder="Stock" className="border border-input rounded-lg px-3 py-2.5 text-sm bg-background" />
              </div>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={3} className="w-full border border-input rounded-lg px-3 py-2.5 text-sm bg-background resize-none" />
              <button onClick={handleSave} className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity">{editingProduct ? "Update Product" : "Add Product"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
