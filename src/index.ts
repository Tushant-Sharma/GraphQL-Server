import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';





// start graphql Server.

async function main() {

    const app = express()
    app.use(express.json())

    const graphQLServer = new ApolloServer({
        typeDefs: `
        type Query {
            hello:String
            say(name:String):String
        }
        `,//Schema as string.
        resolvers: {
            Query: {
                hello: () => 'Hey there , im a graphql server.',
                say: (_, { name }: { name: String }) => `Hey ${name} is myname.`
            }
        } // Actually funciton will run .
    })

    await graphQLServer.start();
    const PORT = Number(process.env.PORT) || 8080;

    app.get("/", (req, res) => {
        res.json({ msg: "running." })
    })

    app.use("/graphql", expressMiddleware(graphQLServer))

    app.listen(PORT, () => {
        console.log(`Server is started on http://localhost:${PORT}/graphql`)
    })
}

main();
