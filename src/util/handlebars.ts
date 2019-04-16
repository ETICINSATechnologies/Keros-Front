import * as path from "path";
import * as handlebars from "express-handlebars";
import { labelToName } from "./handlebars/genderHelper";
import { typeToName } from "./handlebars/factureTypeHelper";
import { IStringable } from "../models/interface/IStringable";
import { Position } from "../models/core/Position";

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
    readonlyIf: function (condition: boolean) {
      return condition ? "readonly" : "";
    },
    disabledIf: function (condition: boolean) {
      return condition ? "disabled" : "";
    },
    gender: function (label: any) {
      return labelToName(label);
    },
    requiredIfMissing: function (item: any) {
      if (item) {
        return "";
      }
      return "required";
    },
    toString: function (item: IStringable, maxLength = 0) {
      let str = item.toString();
      if (maxLength > 0) {
        str = str.slice(0, maxLength) + "...";
      }
      return str;
    },
    maxLength: function (str: string, maxLength: number): string {
      if (maxLength > 0) {
        str = str.slice(0, maxLength) + "...";
      }
      return str;
    },
    concat: function (str1: string, str2: string): string {
      return str1 + str2;
    },
    typeToString: function (label: any) {
      return typeToName(label);
    },
    isFromPerf: function (positions: Position[]) {
      return positions.some(function(pos) {
        let b = false;
        if (pos.pole) {
          b = 4 === pos.pole.id;
        }
        return b;
      });
    },
    isFromUa: function (positions: Position[]) {
      return positions.some(function(pos) {
        let b = false;
        if (pos.pole) {
          b = 3 === pos.pole.id;
        }
        return b;
      });
    },
    isFromBoard (positions: Position[]) {
      return positions.some(function(pos) {
        let b = false;
        if (pos.isBoard) {
          b = pos.isBoard;
        }
        return b;
      });
    },
    isFromRH (positions: Position[]) {
      return positions.some(function(pos) {
        let b = false;
        if (pos.pole) {
          b = 1 === pos.pole.id;
        }
        return b;
      });
    },
    isFromDevCo (positions: Position[]) {
      return positions.some(function(pos) {
        let b = false;
        if (pos.pole) {
          b = 6 === pos.pole.id;
        }
        return b;
      });
    },
    isFromTreso (positions: Position[]) {
      return positions.some(function (pos) {
        let b = false;
        if (pos.pole) {
          b = 5 === pos.pole.id;
        }
        return b;
      });
    },
    isAdmin (positions: Position[]) {
      return positions.some(function (pos) {
        return 4 === pos.id;
      });
    },
    isChadaff (positions: Position[]) {
      return positions.some(function (pos) {
        return 7 === pos.id;
      });
    },
    isRespUa (positions: Position[]) {
      return positions.some(function (pos) {
        return 10 === pos.id;
      });
    }
  }
});