// Mutaion is used for creating datebase. 
export const mutation = `
#graphql
type Mutation {
    createuser(firstName:String! ,lastName:String!, email:String! , password:String!):String

}
`