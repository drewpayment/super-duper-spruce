
export async function getApolloClient() {
  const {ApolloClient, HttpLink, InMemoryCache} = await import('@apollo/client');
  return new ApolloClient({
    link: new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_GRAPHQL}`,
    }),
    cache: new InMemoryCache(),
  });
}

const graphClient = await getApolloClient();

export default graphClient;
