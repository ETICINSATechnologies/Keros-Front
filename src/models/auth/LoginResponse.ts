export class LoginResponse {

  /**
   * @param {string} token The authentication token to be sent to the back for secured requests
   */
  constructor(
    public token ?: string, public errorCode ?: number
  ) {
  }
}