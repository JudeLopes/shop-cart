const mysql = require('mysql2');
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'online_shopping'
});

db.query('SELECT PARAMETER_NAME, DATA_TYPE FROM information_schema.parameters WHERE SPECIFIC_NAME = "sp_place_order"', (err, res) => {
  if (err) console.error(err);
  else console.log(JSON.stringify(res, null, 2));
  process.exit();
});
