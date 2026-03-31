
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host:"localhost",
  user:"root",
  password:"",
  database:"online_shopping",
  multipleStatements: true
});

app.get("/api/products",(req,res)=>{
  db.query("SELECT *, product_id AS id FROM vw_products",(err,result)=>{
    if(err) return res.status(500).json(err);
    res.json(result);
  });
});

app.get("/api/categories", (req, res) => {
  db.query("SELECT *, category_id AS id FROM categories", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.get("/api/products/:id", (req, res) => {
  db.query(
    "SELECT *, product_id AS id FROM vw_products WHERE product_id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length === 0) return res.status(404).json({ msg: "Product not found" });
      
      const product = result[0];
      // Fetch associated images
      db.query("SELECT image_url FROM product_images WHERE product_id = ?", [req.params.id], (err2, imgResult) => {
        product.images = imgResult.length > 0 ? imgResult.map(i => i.image_url) : [product.image_url];
        res.json(product);
      });
    }
  );
});

// Auth - Login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(401).json({ msg: "Invalid credentials" });
    const user = result[0];
    res.json(user);
  });
});

// Auth - Register
app.post("/api/auth/register", (req, res) => {
  const { full_name, email, password, phone } = req.body;
  const query = "INSERT INTO users (full_name, email, password_hash, phone, role) VALUES (?, ?, ?, ?, 'customer')";
  db.query(query, [full_name, email, password, phone], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ msg: "Email already exists" });
      return res.status(500).json(err);
    }
    db.query("SELECT * FROM users WHERE user_id = ?", [result.insertId], (err2, result2) => {
      res.json(result2[0]);
    });
  });
});

// Add to cart
app.post("/api/cart", (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  const query = "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?";
  db.query(query, [user_id, product_id, quantity, quantity], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ msg: "Added to cart" });
  });
});

// Update cart quantity
app.put("/api/cart", (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  db.query("UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?", [quantity, user_id, product_id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ msg: "Cart updated" });
  });
});

// Remove from cart
app.delete("/api/cart/:user_id/:product_id", (req, res) => {
  db.query("DELETE FROM cart WHERE user_id = ? AND product_id = ?", [req.params.user_id, req.params.product_id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ msg: "Removed from cart" });
  });
});

// Get cart
app.get("/api/cart/:user_id", (req, res) => {
  db.query("SELECT * FROM vw_cart_details WHERE user_id = ?", [req.params.user_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Place Order
app.post("/api/orders", (req, res) => {
  const { user_id, address_id, payment_method, discount_amount, final_amount } = req.body;
  
  const d_amt = Number(discount_amount) || 0;
  const f_amt = Number(final_amount) || 0;
  
  const fs = require("fs");
  fs.appendFileSync("order_logs.txt", `[${new Date().toISOString()}] User:${user_id} Disc:${d_amt} Final:${f_amt}\n`);

  console.log("EXEC CALL sp_place_order_v2:", [user_id, address_id, payment_method, d_amt, f_amt]);

  const query = "CALL sp_place_order_v2(?, ?, ?, ?, ?, @p_order_id); SELECT @p_order_id AS order_id;";
  db.query(query, [user_id, address_id, payment_method, d_amt, f_amt], (err, results) => {
      if (err) {
        console.error("Critical Order Error:", err);
        return res.status(500).json({ error: err.message, sql: err.sql });
      }
      
      console.log("DB Results:", JSON.stringify(results));
      const orderId = results[1] ? results[1][0].order_id : null;
      res.json({ message: "Order placed Successfully", order_id: orderId, discount_saved: d_amt, final_price: f_amt });
  });
});

// Get Orders
app.get("/api/orders/:user_id", (req, res) => {
  db.query("SELECT * FROM vw_order_summary WHERE user_id = ? ORDER BY ordered_at DESC", [req.params.user_id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.json([]);
    const orders = result;
    let processed = 0;
    orders.forEach((order, index) => {
      db.query("SELECT * FROM order_items oi JOIN products p ON oi.product_id = p.product_id WHERE oi.order_id = ?", [order.order_id], (err3, items) => {
        orders[index].items = items;
        processed++;
        if (processed === orders.length) res.json(orders);
      });
    });
  });
});

// Addresses
app.get("/api/addresses/:user_id", (req, res) => {
  db.query("SELECT *, address_id AS id, address_line1 AS line1, address_line2 AS line2 FROM addresses WHERE user_id = ?", [req.params.user_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.post("/api/addresses", (req, res) => {
  const { user_id, label, line1, line2, city, state, pincode, is_default } = req.body;
  const query = "INSERT INTO addresses (user_id, label, address_line1, address_line2, city, state, pincode, is_default) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(query, [user_id, label, line1, line2, city, state, pincode, is_default || 0], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, msg: "Address added" });
  });
});

// Coupons
app.get("/api/coupons/:code", (req, res) => {
  db.query("SELECT * FROM coupons WHERE code = ? AND is_active = 1", [req.params.code], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json({ msg: "Invalid or expired coupon" });
    res.json(result[0]);
  });
});

// Reviews
app.get("/api/reviews/:product_id", (req, res) => {
  db.query("SELECT * FROM reviews WHERE product_id = ? ORDER BY created_at DESC", [req.params.product_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.post("/api/reviews", (req, res) => {
  const { user_id, user_name, product_id, rating, review_text } = req.body;
  const query = "INSERT INTO reviews (user_id, user_name, product_id, rating, review_text) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [user_id, user_name, product_id, rating, review_text], (err) => {
    if (err) return res.status(500).json(err);
    // After posting review, we might trigger sp_update_rating in mySQL if it exists - the schema has it!
    res.json({ msg: "Review posted" });
  });
});

// Wishlist
app.get("/api/wishlist/:user_id", (req, res) => {
  const query = `
    SELECT p.*, p.product_id AS id 
    FROM wishlist w 
    JOIN vw_products p ON w.product_id = p.product_id 
    WHERE w.user_id = ?
  `;
  db.query(query, [req.params.user_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.post("/api/wishlist", (req, res) => {
  const { user_id, product_id } = req.body;
  db.query("INSERT INTO wishlist (user_id, product_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE product_id = product_id", [user_id, product_id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ msg: "Added to wishlist" });
  });
});

app.delete("/api/wishlist/:user_id/:product_id", (req, res) => {
  db.query("DELETE FROM wishlist WHERE user_id = ? AND product_id = ?", [req.params.user_id, req.params.product_id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ msg: "Removed from wishlist" });
  });
});

app.listen(5000,()=>console.log("Server running on 5000"));
