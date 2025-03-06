// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest } from "next";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import { ApolloServer } from "@apollo/server";
import typeDefs from "@/modules/inventory/graphql/material.typedefs";
import resolvers from "@/modules/inventory/graphql/material.resolvers";

const apolloServer = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: [resolvers],
});

const handler = startServerAndCreateNextHandler<NextApiRequest>(apolloServer, {
  context: async (req) => ({ req }),
});

export default handler;
