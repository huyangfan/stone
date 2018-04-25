import util from 'util';
import winston from 'winston';
import config from '../config';
import DailyRotateFile from 'winston-daily-rotate-file';

var logger = winston.createLogger({
    level: 'debug',
    format: winston.format.simple(),
    colorize: true,
    transports: [
        new winston.transports.Console({
            colorize: true
        })
    ],
    exitOnError: false
});
logger.emitErrs = true;

// write log file only in env:prod
if (config.env == 'prod') {
    logger.add(new winston.transports.DailyRotateFile({
        filename: `${config.logDir}/error.log`,
        level: 'error',
        format: winston.format.json(),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m'
    }));
    logger.add(new winston.transports.DailyRotateFile({
        filename: `${config.logDir}/combined.log`,
        format: winston.format.json(),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m'
    }));
}

logger.on('error', function (err) {
    console.error('winston error:', err);
});

function formatArgs(args) {
    return [util.format.apply(util.format, Array.prototype.slice.call(args))];
}

console.log = function () {
    logger.debug.apply(logger, formatArgs(arguments));
};
console.info = function () {
    logger.info.apply(logger, formatArgs(arguments));
};
console.warn = function () {
    logger.warn.apply(logger, formatArgs(arguments));
};
console.error = function () {
    logger.error.apply(logger, formatArgs(arguments));
};
console.debug = function () {
    logger.debug.apply(logger, formatArgs(arguments));
};

export default logger;