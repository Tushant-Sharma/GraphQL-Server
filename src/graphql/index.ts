import { ApolloServer } from "@apollo/server";
import { User } from "./user/user.index";

async function createApollorServer() {

    const gqlServer = new ApolloServer<{
        token?: string
    }>({
        typeDefs: `
        ${User.typeDefs}
type Query {
  ${User.query}
}

type Mutation{

    ${User.mutation}
}
       
        `,

        resolvers: {
            Query: {
                ...User.resolver.Query,
            },
            Mutation: {
                ...User.resolver.Mutation
            }
        }
    })

    await gqlServer.start();
    return gqlServer;
}

export default createApollorServer