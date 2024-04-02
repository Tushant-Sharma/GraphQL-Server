import { mergeTypeDefs } from "@graphql-tools/merge";

import { User } from "./user/user.index";

const _mergeTypeDefs = mergeTypeDefs([User._typeDefs.query,User._typeDefs.mutation,User._typeDefs.typeDefs])
export default _mergeTypeDefs;
