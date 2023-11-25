import { UserExpiredError } from "src/app/errors/user-expired-error";
import { IUser } from "./iuser";

export class User {
    private tokenExp: number = 0;

    constructor(
        public UserDetails: IUser,
        private accessToken: string
    ) {}

    public updateDetails(details: IUser): void {
        this.UserDetails = details;
    }

    public get token(): string {
        try {
            if(Date.now() < this.tokenExp) return this.accessToken;
            else throw new UserExpiredError();
        } catch(e: any) {
            console.error(e);
            return "";
        }
    }

    public set token(accessToken: string) {
        this.accessToken = accessToken;
    }
}
