export const typeDefs=`
#graphql
type User {
id         :String  
firstName  :String!
lastName   :String!
email      :String
profileImg :String
age        :Int!
hashPass   :String!
salt       :String!
}

input SigninInputs {
    email:String!
    password:String!
}

`