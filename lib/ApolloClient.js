// lib/apolloClient.js
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/client-integration-nextjs";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // this needs to be an absolute url, as relative urls cannot be used in SSR
      uri: "http://localhost:3000/api/graphql", 
      // you can override the default `fetch` implementation here
      // fetch: (uri, options) => fetch(uri, options),
      
    }),
  });
});