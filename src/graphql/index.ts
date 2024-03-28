import { ApolloServer } from "@apollo/server";

async function createApollorServer() {

    const gqlServer = new ApolloServer({
        typeDefs: `
        type Query {
            hello:String
            say(name:String):String
        }

        type Mutation {
            create(firstName:String! ,lastName:String!, age:Int! , hashPass:String!):Boolean
        }
        `,//Schema as string.
        resolvers: {
            Query: {
                hello: () => 'Hey there , im a graphql server.',
                say: (_, { name }: { name: String }) => `Hey ${name} is myname.`
            },
            Mutation: {
                create: async (_, { firstName, lastName, age, hashPass }: { firstName: string, lastName: string, age: number, hashPass: string }) => {
                    await prisma.user.create({
                        data: {
                            firstName, lastName, hashPass, salt: "something", age
                        },
                    })

                    return true;
                }
            }
        } // Actually funciton will run .
    })

    await gqlServer.start();
    return gqlServer;
}