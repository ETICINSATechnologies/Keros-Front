import {Launcher} from "../src/launcher";
import * as supertest from "supertest";
import {Response} from "supertest";

export let request = supertest.agent(Launcher.bootstrap().app);

export class Cookie {
  constructor(
    public name?: string,
    public value?: string
  ) {
  }
}

/**
 * Returns the value of a cookie given it's name and the response
 * @returns {string | null} the value of the cookie if found, null if not
 */
export function getCookie(resp: Response, cookieName: string): string | null {
  if (!resp.header['set-cookie'] || !resp.header['set-cookie'][0]) {
    return null;
  }
  const regexp = new RegExp(cookieName + '=(\\w+);', 'gi');
  const match = regexp.exec(resp.header['set-cookie'][0]);
  if (match != null && match[1]) {
    return match[1];
  } else {
    return null;
  }
}

export function defaultCookies(): string {
  return [
    'token=testToken',
    'connectedUser={"id":1,"username":"username","firstName":"Conor","lastName":"Breeze","gender":{"id":1,"label":"H"},"email":"fake.mail@fake.com","birthday":"1975-12-25","department":{"id":1,"label":"BB","name":"Biochimie et Biotechnologies"},"schoolYear":3,"telephone":"+332541254","address":{"id":2,"line1":"11 Baker street","line2":"appt 501","postalCode":6930,"city":"dublin","country":{"id":2,"label":"Afrique du Sud"}},"positions":[{"id":3,"label":"ChargÃ© d\'affaires","pole":{"id":10,"label":"UA","name":"UnitÃ© d\'affaires"}}]}'
  ].join("; ");
}