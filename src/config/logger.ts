import  winston, { format, transports } from "winston";

const logFormat = format.printf(({ level, message, timestamp }) => {
	return format.colorize().colorize(
		level,
		`[${timestamp}] [${level.toUpperCase()}]\t: ${message}`
	);
});

export const configureLogger = (level: string) => {
	winston.configure({
		level,
		format: format.combine(
			format.timestamp({ format: "YYYY-MM-DD HH:mm:ss"}),
			format.splat(),
			logFormat
		),
		transports: [
			new transports.Console(),
			new transports.File({
				filename: __dirname + "/../../logs/app.log",
				maxsize: 2048
			})
		]
	});
};
