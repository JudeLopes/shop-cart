export interface Product {
  id: number;
  product_id?: number;
  name: string;
  brand: string;
  category_id: number;
  category_name: string;
  price: number;
  discount_pct: number;
  effective_price: number;
  stock: number;
  stock_qty?: number;
  description: string;
  image_url: string;
  images: string[];
  avg_rating: number;
  rating?: number;
  review_count: number;
  is_active: boolean;
}

export interface Category {
  id: number;
  name: string;
  parent_id: number | null;
  children?: Category[];
}

export interface CartItem {
  product_id: number;
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  user_id: number;
  total: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  payment_method: string;
  payment_status: "paid" | "unpaid";
  ordered_at: string;
  items: OrderItem[];
}

export interface OrderItem {
  product_id: number;
  product_name: string;
  image_url: string;
  quantity: number;
  price: number;
}

export interface Review {
  id: number;
  user_id: number;
  user_name: string;
  product_id: number;
  rating: number;
  review_text: string;
  created_at: string;
}

export interface User {
  id: number;
  user_id?: number;
  name: string;
  full_name?: string;
  email: string;
  phone: string;
  role: "customer" | "admin";
  is_active: boolean;
  created_at: string;
}

export interface Address {
  id: number;
  user_id: number;
  label: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
}

export interface Coupon {
  code: string;
  discount_type: "percentage" | "flat";
  discount_value: number;
  min_order: number;
  max_discount: number;
}

const IMG = "https://via.placeholder.com/300";

export const categories: Category[] = [
  { id: 1, name: "Electronics", parent_id: null, children: [
    { id: 5, name: "Smartphones", parent_id: 1 },
    { id: 6, name: "Laptops", parent_id: 1 },
    { id: 7, name: "Headphones", parent_id: 1 },
  ]},
  { id: 2, name: "Fashion", parent_id: null, children: [
    { id: 8, name: "Men's Clothing", parent_id: 2 },
    { id: 9, name: "Women's Clothing", parent_id: 2 },
    { id: 10, name: "Footwear", parent_id: 2 },
  ]},
  { id: 3, name: "Home & Kitchen", parent_id: null, children: [
    { id: 11, name: "Furniture", parent_id: 3 },
    { id: 12, name: "Appliances", parent_id: 3 },
  ]},
  { id: 4, name: "Books", parent_id: null },
];

export const products: Product[] = [];

export const reviews: Review[] = [
  { id: 1, user_id: 2, user_name: "Rahul S.", product_id: 1, rating: 5, review_text: "Amazing phone! Camera quality is unbelievable.", created_at: "2024-02-15" },
  { id: 2, user_id: 3, user_name: "Priya M.", product_id: 1, rating: 4, review_text: "Great build quality, but expensive.", created_at: "2024-02-10" },
  { id: 3, user_id: 4, user_name: "Amit K.", product_id: 4, rating: 5, review_text: "Best noise cancelling headphones I've ever used.", created_at: "2024-01-20" },
  { id: 4, user_id: 2, user_name: "Rahul S.", product_id: 9, rating: 5, review_text: "Life-changing book. Must read for everyone.", created_at: "2024-03-01" },
  { id: 5, user_id: 5, user_name: "Sneha R.", product_id: 3, rating: 5, review_text: "Fastest laptop I've ever owned. Battery lasts all day.", created_at: "2024-02-28" },
  { id: 6, user_id: 3, user_name: "Priya M.", product_id: 8, rating: 4, review_text: "Makes cooking so easy. Love the pressure cook function.", created_at: "2024-01-15" },
];

export const mockOrders: Order[] = [
  { id: 1001, user_id: 1, total: 167902, status: "delivered", payment_method: "UPI", payment_status: "paid", ordered_at: "2024-03-10", items: [
    { product_id: 1, product_name: "iPhone 15 Pro Max", image_url: IMG, quantity: 1, price: 143910 },
    { product_id: 4, product_name: "Sony WH-1000XM5", image_url: IMG, quantity: 1, price: 23992 },
  ]},
  { id: 1002, user_id: 1, total: 2799, status: "shipped", payment_method: "COD", payment_status: "unpaid", ordered_at: "2024-03-15", items: [
    { product_id: 5, product_name: "Levi's 511 Slim Fit Jeans", image_url: IMG, quantity: 1, price: 2799 },
  ]},
  { id: 1003, user_id: 1, total: 638, status: "pending", payment_method: "Card", payment_status: "paid", ordered_at: "2024-03-18", items: [
    { product_id: 9, product_name: "Atomic Habits", image_url: IMG, quantity: 1, price: 359 },
    { product_id: 14, product_name: "The Psychology of Money", image_url: IMG, quantity: 1, price: 279 },
  ]},
];

export const mockAddresses: Address[] = [
  { id: 1, user_id: 1, label: "Home", line1: "123, Green Park", line2: "Near Metro Station", city: "New Delhi", state: "Delhi", pincode: "110016", is_default: true },
  { id: 2, user_id: 1, label: "Office", line1: "456, Cyber Hub", line2: "Tower B, 5th Floor", city: "Gurugram", state: "Haryana", pincode: "122002", is_default: false },
];

export const coupons: Coupon[] = [
  { code: "SAVE10", discount_type: "percentage", discount_value: 10, min_order: 1000, max_discount: 5000 },
  { code: "FLAT500", discount_type: "flat", discount_value: 500, min_order: 3000, max_discount: 500 },
  { code: "WELCOME20", discount_type: "percentage", discount_value: 20, min_order: 500, max_discount: 2000 },
];

export const mockUsers: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "9876543210", role: "customer", is_active: true, created_at: "2024-01-01" },
  { id: 2, name: "Rahul Sharma", email: "rahul@example.com", phone: "9876543211", role: "customer", is_active: true, created_at: "2024-01-05" },
  { id: 3, name: "Priya Menon", email: "priya@example.com", phone: "9876543212", role: "customer", is_active: true, created_at: "2024-01-10" },
  { id: 4, name: "Amit Kumar", email: "amit@example.com", phone: "9876543213", role: "customer", is_active: false, created_at: "2024-02-01" },
  { id: 5, name: "Sneha Rao", email: "sneha@example.com", phone: "9876543214", role: "customer", is_active: true, created_at: "2024-02-15" },
  { id: 6, name: "Admin User", email: "admin@shop.com", phone: "9999999999", role: "admin", is_active: true, created_at: "2024-01-01" },
];

export const brands = [...new Set(products.map(p => p.brand))];
