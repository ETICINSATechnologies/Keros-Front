import path from "path";

export const HBS_CONFIG = {
	extname: "hbs",
	defaultLayout: "main",
	layoutsDir: path.join(__dirname, "../../views/layouts"),
	partialsDir: path.join(__dirname, "../../views/partials"),
	helpers: {}
};
