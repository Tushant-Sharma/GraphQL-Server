import { prisma } from "../lib/db";
import { createHmac, randomBytes } from 'node:crypto'
import Jwt, { JwtPayload } from "jsonwebtoken"

export interface UserSignInTypes {
    email: string
    password: string
}
export interface UserSignUpTypes {
    firstName: string,
    lastName?: string,
    email: string,
    password: string,
    headers?: string
}

const JWT_SECRETE_KEY = "#NOTMUCH"

class UserService {
    constructor() {

    }

    private static GenerateHashPasswrod(salt: string, pass: string): string {
        return createHmac("sha256", salt).update(pass).digest("hex")
    }

    private static async GetUserHashWithEmail(email: string) {
        return await prisma.user.findUnique({
            where: {
                email: email
            }
        })
    }

    public static DecodeJwtToken(token: string) {
        return Jwt.verify(token, JWT_SECRETE_KEY)
    }

    public static async GenerateJwtToken(payload: UserSignInTypes) {
        const { email, password } = payload;
        const _user = await UserService.GetUserHashWithEmail(email);
        if (!_user) throw new Error("User Not Found");

        const hashPass = UserService.GenerateHashPasswrod(_user.salt, password)
        if (hashPass !== _user.hashPass) throw new Error("Invalid Authentication.")
        const token = Jwt.sign({ email: _user.email }, JWT_SECRETE_KEY)
        return token;
    }

    public static async CreateUser(payload: UserSignUpTypes) {
        const salt = randomBytes(32).toString("hex")
        const { firstName, lastName, email, password, headers } = payload;
        const pass = UserService.GenerateHashPasswrod(salt, password)
        return await prisma.user.create({
            data: {
                firstName, lastName, email, headers, hashPass: pass, salt: salt
            }
        })
    }
}

export default UserService;