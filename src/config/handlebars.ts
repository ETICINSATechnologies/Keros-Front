import path from "path";

export const HBS_CONFIG = {
	extname: "hbs",
	defaultLayout: "main",
	layoutsDir: path.join(__dirname, "../../views/layouts"),
	partialsDir: path.join(__dirname, "../../views/partials"),
	helpers: {
		eq (a: any, b: any) {
			return a === b;
		},
		gender (code: any) {
			let label;
			switch (code) {
				case "H":
					label = "Homme";
					break;
				case "F":
					label = "Femme";
					break;
				case "A":
					label = "Autre";
					break;
				default:
					label = "Inconnu";
					break;
			}
			return label;
		},
		isSubstring (a: any, b: any) {
			return a.indexOf(b) !== -1;
		}
	}
};
