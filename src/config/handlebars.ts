import path from "path";

export const HBS_CONFIG = {
  extname: "hbs",
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "../../views/layouts"),
  partialsDir: path.join(__dirname, "../../views/partials"),

  /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
  helpers: {
    eq (a: any, b: any): boolean {
      return a === b;
    },
    ne (a: any, b: any): boolean {
      return a !== b;
    },
    and (...args: any[]): boolean {
      return Array.prototype.slice.call(args, 0, -1).every(Boolean);
    },
    or (...args: any[]): boolean {
      return Array.prototype.slice.call(args, 0, -1).some(Boolean);
    },
    gender (code: any): string {
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
    substr (a: any, b: any): string {
      return a.includes(b);
    },
    date (a: string): string {
      return new Date(a).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    },
    afterToday (a: string): boolean {
      return new Date(a) < new Date(Date.now());
    },
    currentYear(): number {
      return new Date().getFullYear();
    }
  /* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
  }
};
