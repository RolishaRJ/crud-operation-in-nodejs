const mysql = require("mysql2");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());


var dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@Lolita1",
  database: "pronotate",
});

dbConn.connect((err) => {
  if (!err) console.log("Database connected successfully");
  else
    console.log(
      "Database connection failed" + JSON.stringify(err, undefined, 2)
    );
});

app.get("/user/list", (req, res) => {
  dbConn.query(`select * from employee`, (err, result, fields) => {
    if (!err) res.send(result);
    else console.log(err);
  });
});
app.get("/user/:id", (req, res) => {
  dbConn.query(
    `select * from employee where id=?`,
    [req.params.id],
    (err, result, fields) => {
      if (!err) res.send(result);
      else console.log(err);
    }
  );
});
app.post("/user/adduser", (req, res) => {
  const { name, age, emp_no, address } = req.body;
  console.log(name, age, emp_no, address);
  let query = `INSERT INTO employee (name,age,emp_no,address) VALUES (?,?,?, ?)`;
  dbConn.query(
   
    query,[name, age, emp_no, address],
    (err, result, fields) => {
      console.log(err, result, fields);
      res.send("add user sucessfully");
    }
  );

  
});
app.delete("/user/:id", (req, res) => {
  dbConn.query(
    `DELETE FROM employee WHERE id=? `,
    [req.params.id],
    (err, result, fields) => {
      if (!err) {
        res.send("Delete sucessfully");
      } else console.log(err);
    }
  );
});
app.put("/user/update/:id", (req, res) => {
  const { name, age, emp_no, address } = req.body;
  const {id} = req.params;
  let updateQuery = `Update employee SET name=?, age=?, emp_no=?,address=? where id=?`
dbConn.query(updateQuery,[name, age, emp_no, address,id], (err, result, fields) => {
    if (!err) res.send(result);
    else console.log(err);
})
    
});

app.listen(port, () =>
  console.log("Express server started at port no : " + port)
);
