const dbConn = require("../dbConnection");
const { signJWTtoken, verifyJWTtoken } = require("../utilities/auth");
var bcrypt = require("bcryptjs");

const listUser = async (req, res) => {
  dbConn.query(`select * from employee`, (err, result, fields) => {
    if (!err) res.send(result);
    else console.log(err);
  });
};

const retrieveUser = async (req, res) => {
  dbConn.query(
    `select * from employee where id=?`,
    [req.params.id],
    (err, result, fields) => {
      if (!err) res.send(result);
      else console.log(err);
    }
  );
};

const updateUser = async (req, res) => {
  const { name, age, emp_no, address } = req.body;
  const { id } = req.params;
  let updateQuery = `Update employee SET name=?, age=?, emp_no=?,address=? where id=?`;
  dbConn.query(
    updateQuery,
    [name, age, emp_no, address, id],
    (err, result, fields) => {
      if (!err) res.send(result);
      else console.log(err);
    }
  );
};

const removeUser = async (req, res) => {
  dbConn.query(
    `DELETE FROM employee WHERE id=? `,
    [req.params.id],
    (err, result, fields) => {
      if (!err) {
        res.send("Delete sucessfully");
      } else console.log(err);
    }
  );
};
const adduser = async (req, res) => {
  const { name, age, emp_no, address } = req.body;
  console.log(name, age, emp_no, address);
  let query = `INSERT INTO employee (name,age,emp_no,address) VALUES (?,?,?, ?)`;
  dbConn.query(query, [name, age, emp_no, address], (err, result, fields) => {
    console.log(err, result, fields);
    res.send("add user sucessfully");
  });
};
const registeruser = async (req, res) => {
  const { username, password } = req.body;

  let encryptedPassword = bcrypt.hashSync(password, 8);

  let query = `INSERT INTO user_details (username,password) VALUES (?,?)`;
  dbConn.query(query, [username, encryptedPassword], (err, result, fields) => {
    console.log(err, result, fields);
    res.send("add user sucessfully");
  });
};

const loginuser = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  let query = `select * from user_details where username=?`;
  dbConn.query(query, [username], async (err, result, fields) => {
    if (result.length > 0) {
      const { password: dbPassword, username: dbUsername, id } = result[0];
      if (dbPassword && bcrypt.compareSync(password, dbPassword)) {
        // authentication failed
        let data = { id: id, username: dbUsername };
        let token = await signJWTtoken(data);
        res.send({ token });
      } else {
        // authentication successful
        res.send({ token: null });
      }
    }
  });

  // let query = `INSERT INTO employee (name,age,emp_no,address) VALUES (?,?,?, ?)`;
};

const tokenVerify = async (req, res) => {
  const token = req.headers['authorization'];
try {
    let val = await verifyJWTtoken(token);
    
    res.send(val);
} catch (error) {
    console.log(error)
}

};

module.exports = {
  adduser,
  listUser,
  updateUser,
  removeUser,
  retrieveUser,
  loginuser,
  registeruser,
  tokenVerify,
};
