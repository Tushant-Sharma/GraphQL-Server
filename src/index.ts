import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { Init } from 'v8';
import { prisma } from './lib/db';
import createApollorServer from './graphql';
import UserService from './service/user.jwt';





// start graphql Server.

async function main() {

    const app = express()
    app.use(express.json())

    // const graphQLServer = new ApolloServer({
    //     typeDefs: `
    //     type Query {
    //         hello:String
    //         say(name:String):String
    //     }

    //     type Mutation {
    //         create(firstName:String! ,lastName:String!, age:Int! , hashPass:String!):Boolean
    //     }
    //     `,//Schema as string.
    //     resolvers: {
    //         Query: {
    //             hello: () => 'Hey there , im a graphql server.',
    //             say: (_, { name }: { name: String }) => `Hey ${name} is myname.`
    //         },
    //         Mutation: {
    //             create: async (_, { firstName, lastName, age, hashPass }: { firstName: string, lastName: string, age: number, hashPass: string }) => {
    //                 await prisma.user.create({
    //                     data: {
    //                         firstName, lastName, hashPass, salt: "something", age
    //                     },
    //                 })

    //                 return true;
    //             }
    //         }
    //     } // Actually funciton will run .
    // })

    // await graphQLServer.start();
    const PORT = Number(process.env.PORT) || 8080;

    app.get("/", (req, res) => {
        res.json({ msg: "running." })
    })

    const graphQLServer = await createApollorServer();
    app.use("/graphql", expressMiddleware(graphQLServer, {
        context: async ({ req }) => ({
            token:  req.headers.authorization
        })
    }));

    app.listen(PORT, () => {
        console.log(`Server is started on http://localhost:${PORT}/graphql`)
    })
}

main();
