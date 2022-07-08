
const express = require("express");
const dbConn = require("./dbConnection");
const {userRouter} = require('./routes/user.routes');
const { signJWTtoken } = require("./utilities/auth");



const app = express();
const port = 3000;


app.use(express.json());

app.use('/user', userRouter);

app.listen(port, () =>
  console.log("Express server started at port no : " + port)
);
