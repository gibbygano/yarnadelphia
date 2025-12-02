import { getCookies, setCookie } from "@std/http/cookie";

declare global {
  interface Response {
    addCookie(
      name: string,
      value: string,
      maxAge?: number,
      secure?: boolean,
    ): this;
  }

  interface Request {
    getCookie(name: string): string;
  }
}

function addCookie(
  this: Response,
  name: string,
  value: string,
  maxAge = 86400,
  secure = true,
) {
  setCookie(this.headers, {
    name,
    value,
    maxAge,
    secure,
  });

  return this;
}

function getCookie(this: Request, name: string) {
  return getCookies(this.headers)[name];
}

Request.prototype.getCookie = getCookie;
Response.prototype.addCookie = addCookie;
