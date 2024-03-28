import { prisma } from "../../lib/db";

export const resolver = {
    Mutation: {
        create: async (_: any, { firstName, lastName, age, hashPass }: { firstName: string, lastName: string, age: number, hashPass: string }) => {
            const user = await prisma.user.create({
                data: {
                    firstName, lastName, hashPass, salt: "something", age
                },
            })

            return user.firstName;
        }
    },
    Query : {
        hello: ()=>'hello shitting.....'
    }
}