const fs = require("fs");
const winston = require("winston");
const logger = require("../controllers/logger");
const path = require("path");
const readLine = require("readline");


const readFile = async (req, res) => {
  logger.userLogger.log("info", "Success");
  console.log("readFile");
 
  console.log(
    path.resolve(process.cwd(), "D:\\Pronoate\\Expressjs")
  );
  
  

   let jsonArray = [];
  var lineReader = readLine.createInterface({
    input: fs.createReadStream(path.resolve(process.cwd(), './Aligntech_Amalgam_Set2__B.json')),
  });

  lineReader.on("line",  (line) => {
    
    jsonArray.push(JSON.parse(line));
  });
  
  lineReader.on("close",() =>{
    res.send(jsonArray);
  })

  lineReader.on("error",(error) => {
    console.log(error);
  })

  logger.userLogger.log("info", "Success");
  
};

module.exports = {
  readFile,
};
