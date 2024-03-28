# Project Setup Guide

This guide will help you set up a new project with TypeScript, Express, and Apollo Server for GraphQL.

## Prerequisites

- Node.js installed on your machine
- Basic knowledge of TypeScript, Express, and GraphQL

## Project Setup

1. **Create a new project directory:**
`mkdir project_name`

2. **Initialize a Git repository:**

`git init`


3. **Ignore Node.js dependencies:** `npx gitignore Node `

If you need to undo `git init` or remove the `.git` folder, use:




4. **Initialize a new Yarn project:** `yarn init`


5. **Add TypeScript and Express:** ``yarn add typescript express @types/express -D``


   Make the following changes in `tsconfig.json`:
   - Add root directory path: `./src`
   - Add build directory path: `./build`

6. **Create the source directory:**
`src/index.ts`


7. **Add tsc-watch for development:**
`yarn add ts-watch -D`

9. **Configure scripts in `package.json`:**
"scripts": {
 "start": "node build/index.js",
 "dev": "tsc-watch --onSuccess \"npm start\""
}

10. **Add Apollo Server and GraphQL:**
`yarn add @apollo/server graphql`


## Setting Up Apollo Server with Express

1. **Create an `index.ts` file in the `src` directory:**
`
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

async function main() {
 const app = express();
 app.use(express.json());

 const graphQLServer = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String
        say(name: String): String
      }
    `,
    resolvers: {
      Query: {
        hello: () => 'Hey there, I am a GraphQL server.',
        say: (_, { name }: { name: String }) => `Hey ${name} is my name.`
      }
    }
 });

 await graphQLServer.start();
 const PORT = Number(process.env.PORT) || 8080;

 app.get("/", (req, res) => {
    res.json({ msg: "running." });
 });

 app.use("/graphql", expressMiddleware(graphQLServer));

 app.listen(PORT, () => {
    console.log(`Server is started on http://localhost:${PORT}/graphql`);
 });
}

main();
`

## Running the Server

1. **Start the server in development mode:
yarn dev
**


2. **Access the GraphQL playground:**

   Open your browser and navigate to `http://localhost:8080/graphql`.

## Next Steps

- Explore the GraphQL schema and resolvers.
- Add more types and resolvers as needed.
- Integrate with a database or other data sources.

