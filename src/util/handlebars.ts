import * as path from "path";
import * as handlebars from "express-handlebars";
import { labelToName } from "./handlebars/genderHelper";
import { typeToName } from "./handlebars/factureTypeHelper";
import { IStringable } from "../models/interface/IStringable";
import { Position } from "../models/core/Position";
import { Config } from "../config/Config";

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
    eq (v1: any, v2: any) {
      return v1 === v2;
    },
    ne (v1: any, v2: any) {
      return v1 !== v2;
    },
    lt (v1: any, v2: any) {
      return v1 < v2;
    },
    gt (v1: any, v2: any) {
      return v1 > v2;
    },
    lte (v1: any, v2: any) {
      return v1 <= v2;
    },
    gte (v1: any, v2: any) {
      return v1 >= v2;
    },
    and () {
      return Array.prototype.slice.call(arguments).every(Boolean);
    },
    or () {
      return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    },
    selected (current: number, selected: any) {
      if (current === selected) {
        return "selected";
      }
      return "";
    },
    readonlyIf (condition: boolean) {
      return condition ? "readonly" : "";
    },
    disabledIf (condition: boolean) {
      return condition ? "disabled" : "";
    },
    gender (label: any) {
      return labelToName(label);
    },
    requiredIfMissing (item: any) {
      if (item) {
        return "";
      }
      return "required";
    },
    toString (item: IStringable, maxLength = 0) {
      let str = item.toString();
      if (maxLength > 0) {
        str = str.slice(0, maxLength) + "...";
      }
      return str;
    },
    maxLength (str: string, maxLength: number): string {
      if (maxLength > 0) {
        str = str.slice(0, maxLength) + "...";
      }
      return str;
    },
    concat (str1: string, str2: string): string {
      return str1 + str2;
    },
    typeToString (label: any) {
      return typeToName(label);
    },
    isFromPerf (positions: Position[]) {
      return positions.some(function(pos) {
        let b = false;
        if (pos.pole) {
          b = 4 === pos.pole.id;
        }
        return b;
      });
    },
    isFromUa (positions: Position[]) {
      return positions.some(function(pos) {
        let b = false;
        if (pos.pole) {
          b = 9 === pos.pole.id;
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
          b = 6 === pos.pole.id;
        }
        return b;
      });
    },
    isFromDevCo (positions: Position[]) {
      return positions.some(function(pos) {
        let b = false;
        if (pos.pole) {
          b = 3 === pos.pole.id;
        }
        return b;
      });
    },
    isFromTreso (positions: Position[]) {
      return positions.some(function (pos) {
        let b = false;
        if (pos.pole) {
          b = 8 === pos.pole.id;
        }
        return b;
      });
    },
    isAdmin (positions: Position[]) {
      return positions.some(function (pos) {
        return 20 === pos.id;
      });
    },
    isSG (positions: Position[]) {
      return positions.some(function (pos) {
        return 22 === pos.id;
      });
    },
    isChadaff (positions: Position[]) {
      return positions.some(function (pos) {
        return 3 === pos.id;
      });
    },
    isRespUa (positions: Position[]) {
      return positions.some(function (pos) {
        return 21 === pos.id;
      });
    },
    isFromPrez (positions: Position[]) {
      return positions.some(function(pos) {
        let b = false;
        if (pos.pole) {
          b = 5 === pos.pole.id;
        }
        return b;
      });
    },
    removeFromArray (tab: any[], index: number) {
      const newTab = [];
      if (tab.length > index) {
        for (let i = index; i < tab.length; i++) {
          newTab.push(tab[i]);
        }
      }
      return newTab;
    },
    isRespUaOrRespQuality(positions: Position[]) {
      return positions.some(function(pos) {
        return 21 === pos.id || 18 === pos.id;
      });
    },
    substring(originalString: string, endIndex: number) {
      return originalString.substring(0, endIndex);
    },
    json(data: any) {
      return JSON.stringify(data);
    },
    isAlumniParam(urlPathWithQueries: string) {
      return urlPathWithQueries && urlPathWithQueries.includes("isAlumni=true");
    },
    isRepaymentDue(dateInput: string) {
      if (!dateInput) return true;
      const dateToCheck = new Date(dateInput.substring(0, 10));
      const currentDate = new Date();
      const repaymentDueDate = new Date(dateToCheck);
      repaymentDueDate.setFullYear(dateToCheck.getFullYear() + 1);
      return currentDate >= repaymentDueDate;
    },
    getStripeApiPK() {
      return Config.getStripeApiPK();
    },
    getSubscriptionFeeProductId() {
      return Config.getSubscriptionFeeProductId();
    }
  }
});
