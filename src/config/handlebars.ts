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
    not (a: any, b: any) {
      return a !== b;
    },
    and () {
      return Array.prototype.slice.call(arguments, 0, -1).every(Boolean);
    },
    or () {
      return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
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
    substr (a: any, b: any) {
      return a.includes(b);
    },
    date (a: string) {
      return new Date(a).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    }
  }
};
