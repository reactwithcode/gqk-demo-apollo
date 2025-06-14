"use client"; // This component provides client-side context.

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// You can define the client outside the component so it's not recreated on every render.
const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

export default function ApolloWrapper({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}