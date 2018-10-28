import * as path from "path";
import * as handlebars from "express-handlebars";
import { labelToName } from "./handlebars/genderHelper";
import { convertRuleOptions } from "tslint/lib/configuration";

/**
 * Handlebars configuration using the express-handlebars constructor
 */
export default handlebars({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDir: path.join(__dirname, "../../views"),
  partialsDir: path.join(__dirname, "../../views/partials/"),
  helpers: {
    ifExists(value: any, defaultValue: any) {
      return value ? value : defaultValue;
    },
    split(value: string, splitter: string) {
      return value.split(splitter);
    },
    toUpper(value: string) {
      return value.toUpperCase();
    },
    toLower(value: string) {
      return value.toLowerCase();
    },
    eq: function (v1: any, v2: any) {
      return v1 === v2;
    },
    ne: function (v1: any, v2: any) {
      return v1 !== v2;
    },
    lt: function (v1: any, v2: any) {
      return v1 < v2;
    },
    gt: function (v1: any, v2: any) {
      return v1 > v2;
    },
    lte: function (v1: any, v2: any) {
      return v1 <= v2;
    },
    gte: function (v1: any, v2: any) {
      return v1 >= v2;
    },
    and: function () {
      return Array.prototype.slice.call(arguments).every(Boolean);
    },
    or: function () {
      return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    },
    selected: function (current: number, selected: any) {
      if (current === selected) {
        return "selected";
      }
      return "";
    },
    gender: function (label: any) {
      return labelToName(label);
    },
    required: function (item: any) {
      if (item) {
        return "";
      }
      return "required";
    }
  }
});