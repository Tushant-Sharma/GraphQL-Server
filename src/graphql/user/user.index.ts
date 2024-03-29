import { mutation } from "./user.mutaion";
import { typeDefs } from "./user.typesdef";
import { query } from './user.query';
import { resolver } from "./user.resolvers";
export const User = { mutation, typeDefs, query , resolver }