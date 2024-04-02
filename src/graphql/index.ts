import { ApolloServer } from "@apollo/server";
import _mergeTypeDefs from "./merge.typedf";
import _mergeResolvers from "./merge.resolvers";
// import { User } from "./user/user.index";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";


async function createApollorServer() {

    try {

        const gqlServer = new ApolloServer<{
            token?: string | undefined
        }>({
            typeDefs: '',

            resolvers: {}
        })


        await gqlServer.start();
        return gqlServer;

    } catch (error) {
        console.log(error)
    }

}

export default createApollorServer