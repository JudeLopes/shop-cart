-- ============================================================
--  ONLINE SHOPPING SYSTEM — MySQL Database
--  Compatible with XAMPP (MySQL 5.7+ / MariaDB 10.x)
--  Includes: Users, Products, Cart, Orders, Admin
-- ============================================================

CREATE DATABASE IF NOT EXISTS online_shopping;
USE online_shopping;

-- ────────────────────────────────────────────────────────────
-- 1. USERS
-- ────────────────────────────────────────────────────────────
CREATE TABLE users (
    user_id       INT AUTO_INCREMENT PRIMARY KEY,
    full_name     VARCHAR(100)        NOT NULL,
    email         VARCHAR(150)        NOT NULL UNIQUE,
    password_hash VARCHAR(255)        NOT NULL,
    phone         VARCHAR(15),
    role          ENUM('customer','admin') DEFAULT 'customer',
    is_active     TINYINT(1)          DEFAULT 1,
    created_at    DATETIME            DEFAULT CURRENT_TIMESTAMP,
    updated_at    DATETIME            DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ────────────────────────────────────────────────────────────
-- 2. USER ADDRESSES
-- ────────────────────────────────────────────────────────────
CREATE TABLE addresses (
    address_id    INT AUTO_INCREMENT PRIMARY KEY,
    user_id       INT                 NOT NULL,
    label         VARCHAR(50)         DEFAULT 'Home',   -- Home / Work / Other
    address_line1 VARCHAR(255)        NOT NULL,
    address_line2 VARCHAR(255),
    city          VARCHAR(100)        NOT NULL,
    state         VARCHAR(100)        NOT NULL,
    pincode       VARCHAR(10)         NOT NULL,
    is_default    TINYINT(1)          DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- ────────────────────────────────────────────────────────────
-- 3. CATEGORIES
-- ────────────────────────────────────────────────────────────
CREATE TABLE categories (
    category_id   INT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(100)        NOT NULL UNIQUE,
    description   TEXT,
    image_url     VARCHAR(255),
    parent_id     INT                 DEFAULT NULL,     -- for sub-categories
    is_active     TINYINT(1)          DEFAULT 1,
    FOREIGN KEY (parent_id) REFERENCES categories(category_id) ON DELETE SET NULL
);

-- ────────────────────────────────────────────────────────────
-- 4. PRODUCTS
-- ────────────────────────────────────────────────────────────
CREATE TABLE products (
    product_id    INT AUTO_INCREMENT PRIMARY KEY,
    category_id   INT                 NOT NULL,
    name          VARCHAR(200)        NOT NULL,
    description   TEXT,
    price         DECIMAL(10,2)       NOT NULL,
    discount_pct  DECIMAL(5,2)        DEFAULT 0.00,     -- percentage discount
    stock_qty     INT                 NOT NULL DEFAULT 0,
    image_url     VARCHAR(255),
    brand         VARCHAR(100),
    rating        DECIMAL(3,2)        DEFAULT 0.00,
    is_active     TINYINT(1)          DEFAULT 1,
    created_at    DATETIME            DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE RESTRICT
);

-- ────────────────────────────────────────────────────────────
-- 5. PRODUCT IMAGES (multiple images per product)
-- ────────────────────────────────────────────────────────────
CREATE TABLE product_images (
    image_id      INT AUTO_INCREMENT PRIMARY KEY,
    product_id    INT                 NOT NULL,
    image_url     VARCHAR(255)        NOT NULL,
    is_primary    TINYINT(1)          DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- ────────────────────────────────────────────────────────────
-- 6. CART
-- ────────────────────────────────────────────────────────────
CREATE TABLE cart (
    cart_id       INT AUTO_INCREMENT PRIMARY KEY,
    user_id       INT                 NOT NULL,
    product_id    INT                 NOT NULL,
    quantity      INT                 NOT NULL DEFAULT 1,
    added_at      DATETIME            DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_cart_item (user_id, product_id),
    FOREIGN KEY (user_id)    REFERENCES users(user_id)    ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- ────────────────────────────────────────────────────────────
-- 7. ORDERS
-- ────────────────────────────────────────────────────────────
CREATE TABLE orders (
    order_id        INT AUTO_INCREMENT PRIMARY KEY,
    user_id         INT                 NOT NULL,
    address_id      INT                 NOT NULL,
    total_amount    DECIMAL(10,2)       NOT NULL,
    discount_amount DECIMAL(10,2)       DEFAULT 0.00,
    final_amount    DECIMAL(10,2)       NOT NULL,
    status          ENUM(
                        'pending',
                        'confirmed',
                        'processing',
                        'shipped',
                        'delivered',
                        'cancelled',
                        'returned'
                    )                   DEFAULT 'pending',
    payment_method  ENUM('cod','upi','card','netbanking') DEFAULT 'cod',
    payment_status  ENUM('unpaid','paid','refunded')      DEFAULT 'unpaid',
    notes           TEXT,
    ordered_at      DATETIME            DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME            DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)    REFERENCES users(user_id)    ON DELETE RESTRICT,
    FOREIGN KEY (address_id) REFERENCES addresses(address_id) ON DELETE RESTRICT
);

-- ────────────────────────────────────────────────────────────
-- 8. ORDER ITEMS
-- ────────────────────────────────────────────────────────────
CREATE TABLE order_items (
    item_id       INT AUTO_INCREMENT PRIMARY KEY,
    order_id      INT                 NOT NULL,
    product_id    INT                 NOT NULL,
    quantity      INT                 NOT NULL,
    unit_price    DECIMAL(10,2)       NOT NULL,   -- price at time of purchase
    discount_pct  DECIMAL(5,2)        DEFAULT 0.00,
    subtotal      DECIMAL(10,2)       NOT NULL,
    FOREIGN KEY (order_id)   REFERENCES orders(order_id)   ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT
);

-- ────────────────────────────────────────────────────────────
-- 9. REVIEWS & RATINGS
-- ────────────────────────────────────────────────────────────
CREATE TABLE reviews (
    review_id     INT AUTO_INCREMENT PRIMARY KEY,
    product_id    INT                 NOT NULL,
    user_id       INT                 NOT NULL,
    rating        TINYINT             NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review_text   TEXT,
    created_at    DATETIME            DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY one_review_per_user (product_id, user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id)    REFERENCES users(user_id)       ON DELETE CASCADE
);

-- ────────────────────────────────────────────────────────────
-- 10. WISHLIST
-- ────────────────────────────────────────────────────────────
CREATE TABLE wishlist (
    wishlist_id   INT AUTO_INCREMENT PRIMARY KEY,
    user_id       INT                 NOT NULL,
    product_id    INT                 NOT NULL,
    added_at      DATETIME            DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_wishlist_item (user_id, product_id),
    FOREIGN KEY (user_id)    REFERENCES users(user_id)    ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- ────────────────────────────────────────────────────────────
-- 11. COUPONS
-- ────────────────────────────────────────────────────────────
CREATE TABLE coupons (
    coupon_id     INT AUTO_INCREMENT PRIMARY KEY,
    code          VARCHAR(50)         NOT NULL UNIQUE,
    discount_type ENUM('flat','percent') NOT NULL,
    discount_val  DECIMAL(10,2)       NOT NULL,
    min_order_amt DECIMAL(10,2)       DEFAULT 0.00,
    max_uses      INT                 DEFAULT NULL,
    used_count    INT                 DEFAULT 0,
    valid_from    DATE                NOT NULL,
    valid_until   DATE                NOT NULL,
    is_active     TINYINT(1)          DEFAULT 1
);

-- ────────────────────────────────────────────────────────────
-- 12. AUDIT LOG (admin actions)
-- ────────────────────────────────────────────────────────────
CREATE TABLE audit_log (
    log_id        INT AUTO_INCREMENT PRIMARY KEY,
    admin_id      INT                 NOT NULL,
    action        VARCHAR(255)        NOT NULL,
    target_table  VARCHAR(100),
    target_id     INT,
    performed_at  DATETIME            DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES users(user_id) ON DELETE RESTRICT
);

-- ============================================================
--  VIEWS
-- ============================================================

-- Product listing with category name and effective price
CREATE OR REPLACE VIEW vw_products AS
SELECT
    p.product_id,
    p.name,
    p.description,
    p.price,
    p.discount_pct,
    ROUND(p.price * (1 - p.discount_pct / 100), 2) AS effective_price,
    p.stock_qty,
    p.image_url,
    p.brand,
    p.rating,
    c.name AS category_name,
    c.category_id
FROM products p
JOIN categories c ON p.category_id = c.category_id
WHERE p.is_active = 1;

-- Order summary per user
CREATE OR REPLACE VIEW vw_order_summary AS
SELECT
    o.order_id,
    o.user_id,
    u.full_name,
    u.email,
    o.final_amount,
    o.status,
    o.payment_method,
    o.payment_status,
    o.ordered_at,
    COUNT(oi.item_id) AS total_items
FROM orders o
JOIN users u       ON o.user_id  = u.user_id
JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id;

-- Cart with product details
CREATE OR REPLACE VIEW vw_cart_details AS
SELECT
    c.cart_id,
    c.user_id,
    c.product_id,
    p.name AS product_name,
    p.image_url,
    ROUND(p.price * (1 - p.discount_pct / 100), 2) AS unit_price,
    c.quantity,
    ROUND(p.price * (1 - p.discount_pct / 100) * c.quantity, 2) AS line_total
FROM cart c
JOIN products p ON c.product_id = p.product_id;

-- ============================================================
--  STORED PROCEDURES
-- ============================================================

DELIMITER $$

-- Place an order from cart
CREATE PROCEDURE sp_place_order(
    IN  p_user_id       INT,
    IN  p_address_id    INT,
    IN  p_payment_method VARCHAR(20),
    OUT p_order_id      INT
)
BEGIN
    DECLARE v_total DECIMAL(10,2);

    -- Calculate total from cart
    SELECT SUM(line_total) INTO v_total
    FROM vw_cart_details
    WHERE user_id = p_user_id;

    IF v_total IS NULL OR v_total = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cart is empty';
    END IF;

    -- Create order
    INSERT INTO orders (user_id, address_id, total_amount, final_amount, payment_method)
    VALUES (p_user_id, p_address_id, v_total, v_total, p_payment_method);

    SET p_order_id = LAST_INSERT_ID();

    -- Copy cart items to order_items
    INSERT INTO order_items (order_id, product_id, quantity, unit_price, discount_pct, subtotal)
    SELECT
        p_order_id,
        c.product_id,
        c.quantity,
        p.price,
        p.discount_pct,
        ROUND(p.price * (1 - p.discount_pct / 100) * c.quantity, 2)
    FROM cart c
    JOIN products p ON c.product_id = p.product_id
    WHERE c.user_id = p_user_id;

    -- Deduct stock
    UPDATE products pr
    JOIN cart c ON pr.product_id = c.product_id
    SET pr.stock_qty = pr.stock_qty - c.quantity
    WHERE c.user_id = p_user_id;

    -- Clear cart
    DELETE FROM cart WHERE user_id = p_user_id;
END$$

-- Update product rating after new review
CREATE PROCEDURE sp_update_rating(IN p_product_id INT)
BEGIN
    UPDATE products
    SET rating = (
        SELECT ROUND(AVG(rating), 2)
        FROM reviews
        WHERE product_id = p_product_id
    )
    WHERE product_id = p_product_id;
END$$

DELIMITER ;

-- ============================================================
--  TRIGGERS
-- ============================================================

DELIMITER $$

-- Recalculate rating after review insert
CREATE TRIGGER trg_after_review_insert
AFTER INSERT ON reviews
FOR EACH ROW
BEGIN
    CALL sp_update_rating(NEW.product_id);
END$$

-- Recalculate rating after review update
CREATE TRIGGER trg_after_review_update
AFTER UPDATE ON reviews
FOR EACH ROW
BEGIN
    CALL sp_update_rating(NEW.product_id);
END$$

DELIMITER ;

-- ============================================================
--  SAMPLE DATA
-- ============================================================

-- Admin user (password: admin123 — bcrypt hash placeholder)
INSERT INTO users (full_name, email, password_hash, phone, role) VALUES
('Admin User',    'admin@shop.com',   '$2b$10$hashedpassword1', '9000000001', 'admin'),
('Jude Lopes',    'jude@example.com', '$2b$10$hashedpassword2', '9000000002', 'customer'),
('Priya Sharma',  'priya@example.com','$2b$10$hashedpassword3', '9000000003', 'customer');

-- Categories
INSERT INTO categories (name, description) VALUES
('Electronics',   'Phones, laptops, gadgets'),
('Clothing',      'Men and women apparel'),
('Books',         'Academic and fiction books'),
('Home & Kitchen','Appliances and cookware'),
('Sports',        'Fitness and outdoor gear');

-- Sub-category example
INSERT INTO categories (name, description, parent_id) VALUES
('Mobile Phones', 'Smartphones and accessories', 1),
('Laptops',       'Notebooks and ultrabooks',    1);

-- Products
INSERT INTO products (category_id, name, description, price, discount_pct, stock_qty, brand) VALUES
(6, 'OnePlus Nord CE 3',    '6.7" AMOLED, 108MP camera, 5000mAh',  24999.00, 10, 50, 'OnePlus'),
(6, 'Samsung Galaxy M34',   '6.5" Super AMOLED, 6000mAh battery',  18999.00,  5, 30, 'Samsung'),
(7, 'HP Pavilion 15',       'Intel i5, 8GB RAM, 512GB SSD',         55999.00,  8, 15, 'HP'),
(2, 'Men Slim Fit T-Shirt', '100% cotton, available S/M/L/XL',        599.00, 20, 200,'Roadster'),
(3, 'DBMS by Navathe',      'Database System Concepts 7th Edition',  850.00,  0, 40, 'McGraw Hill'),
(4, 'Prestige Iron',        '1000W dry iron with non-stick sole',   1299.00, 15, 60, 'Prestige'),
(5, 'Decathlon Yoga Mat',   '6mm thick, anti-slip, with carry bag',  999.00,  0, 80, 'Decathlon');

-- Addresses
INSERT INTO addresses (user_id, label, address_line1, city, state, pincode, is_default) VALUES
(2, 'Home', 'Flat 4B, Rose Apartments, Linking Road', 'Mumbai', 'Maharashtra', '400050', 1),
(3, 'Home', '12, MG Road',                            'Pune',   'Maharashtra', '411001', 1);

-- Cart items
INSERT INTO cart (user_id, product_id, quantity) VALUES
(2, 1, 1),
(2, 5, 2),
(3, 3, 1);

-- Coupons
INSERT INTO coupons (code, discount_type, discount_val, min_order_amt, max_uses, valid_from, valid_until) VALUES
('WELCOME10', 'percent', 10.00, 499.00,  1000, '2024-01-01', '2026-12-31'),
('FLAT200',   'flat',   200.00, 999.00,   500, '2024-01-01', '2026-12-31'),
('STUDENT50', 'percent', 50.00, 299.00,   200, '2024-01-01', '2026-06-30');

-- ============================================================
--  USEFUL QUERIES FOR VIVA / DEMO
-- ============================================================

-- 1. All products with effective price
-- SELECT * FROM vw_products;

-- 2. Cart total for a user
-- SELECT user_id, SUM(line_total) AS cart_total FROM vw_cart_details WHERE user_id = 2;

-- 3. Orders for a user
-- SELECT * FROM vw_order_summary WHERE user_id = 2;

-- 4. Top 5 selling products
-- SELECT p.name, SUM(oi.quantity) AS total_sold
-- FROM order_items oi JOIN products p ON oi.product_id = p.product_id
-- GROUP BY oi.product_id ORDER BY total_sold DESC LIMIT 5;

-- 5. Revenue by category
-- SELECT c.name, SUM(oi.subtotal) AS revenue
-- FROM order_items oi
-- JOIN products p ON oi.product_id = p.product_id
-- JOIN categories c ON p.category_id = c.category_id
-- GROUP BY c.category_id ORDER BY revenue DESC;

-- 6. Users who haven't placed any orders
-- SELECT u.user_id, u.full_name, u.email FROM users u
-- LEFT JOIN orders o ON u.user_id = o.user_id
-- WHERE o.order_id IS NULL AND u.role = 'customer';

-- 7. Low stock alert (qty < 10)
-- SELECT product_id, name, stock_qty FROM products WHERE stock_qty < 10 AND is_active = 1;

-- 8. Place an order via stored procedure
-- CALL sp_place_order(2, 1, 'upi', @new_order_id);
-- SELECT @new_order_id;
