import { mergeResolvers } from "@graphql-tools/merge";
import { User } from "./user/user.index";

const _mergeResolvers=mergeResolvers([User.resolver])

export default _mergeResolvers;