/**
 * Error class with an added field for the HTTP Status
 */
export default class HttpError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}