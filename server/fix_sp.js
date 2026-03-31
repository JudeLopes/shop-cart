const mysql = require('mysql2');
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'online_shopping',
  multipleStatements: true
});

const sql = `
DROP PROCEDURE IF EXISTS sp_place_order_v2;
CREATE PROCEDURE sp_place_order_v2(
  IN p_user_id INT, 
  IN p_address_id INT, 
  IN p_payment_method VARCHAR(50), 
  IN p_discount_amount DECIMAL(10,2), 
  IN p_final_amount DECIMAL(10,2), 
  OUT p_order_id INT
)
BEGIN
  -- Insert the order with the coupon discount
  INSERT INTO orders (
    user_id, address_id, total_amount, discount_amount, final_amount, 
    status, payment_method, payment_status
  ) 
  VALUES (
    p_user_id, p_address_id, p_final_amount + p_discount_amount, p_discount_amount, p_final_amount, 
    "pending", p_payment_method, "unpaid"
  );
  
  SET p_order_id = LAST_INSERT_ID();

  -- Move items from cart to order_items
  INSERT INTO order_items (order_id, product_id, quantity, unit_price, discount_pct, subtotal)
  SELECT 
    p_order_id, 
    c.product_id, 
    c.quantity, 
    p.price, 
    p.discount_pct, 
    (p.price * (1 - p.discount_pct/100) * c.quantity)
  FROM cart c
  JOIN products p ON c.product_id = p.product_id
  WHERE c.user_id = p_user_id;

  -- Clear the user's cart
  DELETE FROM cart WHERE user_id = p_user_id;
END;
`;

db.query(sql, (err) => {
  if (err) console.error(err);
  else console.log('Procedure sp_place_order_v2 created successfully');
  process.exit();
});
