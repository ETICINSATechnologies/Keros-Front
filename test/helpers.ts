import { Launcher } from "../src/launcher";
import * as supertest from "supertest";
import { Response } from "supertest";

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