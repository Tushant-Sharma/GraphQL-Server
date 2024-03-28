import { ApolloServer } from "@apollo/server";
import { User } from "./user/user.index";

async function createApollorServer() {

    const gqlServer = new ApolloServer({
        typeDefs: `
type Query {
  ${User.query}
}
       
        `,

        resolvers: {
            Query: {
             ...User.resolver.Query
            }
        }
    })

    await gqlServer.start();
    return gqlServer;
}

export default createApollorServer