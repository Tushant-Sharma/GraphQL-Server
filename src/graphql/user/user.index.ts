import { mutation } from "./user.mutaion";
import { typeDefs } from "./user.typesdef";
import { query } from './user.query';
import { resolver } from "./user.resolvers";


const _typeDefs ={ typeDefs , query , mutation};
export const User = { mutation, _typeDefs, resolver }