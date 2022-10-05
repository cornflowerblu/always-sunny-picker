import { GraphQLClient } from "graphql-request";
import invariant from "tiny-invariant";

require('dotenv').config();

export default function InitGraphQL(){
  const graphql = {
    url: process.env.GRAPHQL_URL,
    adminSecret: process.env.GRAPHQL_ADMIN_SECRET
  }
  
  invariant(graphql.url, 'GRAPHQL URL NOT SET!');
  const gqlClient = new GraphQLClient(graphql.url);
  
  invariant(graphql.adminSecret, 'GRAPHQL SECRET NOT SET!');
  const adminRequestHeaders = {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': graphql.adminSecret
  };

  return { gqlClient, adminRequestHeaders }
}

