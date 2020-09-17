export class ResetPasswordRequest {
    constructor(
        public password ?: string,
        public token ?: string
    ) {
    }
}
