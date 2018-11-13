// Winston
let winston = require('winston')
let logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
        }),
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({filename: 'info.log'})
    ]
});

exports.logger = logger;
