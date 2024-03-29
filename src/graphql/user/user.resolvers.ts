import { Token } from "graphql";
import UserService, { UserSignInTypes, UserSignUpTypes } from "../../service/user.jwt";

export const resolver = {
    Mutation: {
        createuser: async (_: any, payload: UserSignUpTypes) => {
            const res = await UserService.CreateUser(payload)
            console.log(payload, res)
            return res.id;
        }
    },
    Query: {
        hello: () => 'hello shitting.....',
        signin: async (_: any, payload: UserSignInTypes, context: { token?: string }) => {
            if (context.token) {

                const _token = UserService.DecodeJwtToken(context.token as string)
                console.log(_token)
            }

            const res = await UserService.GenerateJwtToken(payload);
            return res;
        }
    }
}