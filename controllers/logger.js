const { createLogger, transports, format } = require("winston");
// logging function ---
const userLogger = createLogger({
  transports: [
    new transports.File({
      filename: "express.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "express.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});
module.exports = { userLogger };
