export class UserExpiredError extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, UserExpiredError.prototype)
        this.message = "Your session has expired - you will need to log in with your credentials again."
    }

}