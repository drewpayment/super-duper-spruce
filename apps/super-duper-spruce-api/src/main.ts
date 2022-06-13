/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import "reflect-metadata";
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import Express from 'express';
import { PropertyResolver } from './app/graph/resolvers/property-resolver';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const resolvers = [
    PropertyResolver,
  ] as const;
  const schema = await buildSchema({
    resolvers,
    orphanedTypes: [],
    emitSchemaFile: true,
  });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });

  const app = Express();

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () => {
    console.log(
      `🚀 Server is running: GraphQL playground available at http://localhost:${PORT}${server.graphqlPath}`,
    );
  });
}

// Catch errors here and report them... maybe logging?
bootstrap().catch((err) => console.log(err, 'error'));
