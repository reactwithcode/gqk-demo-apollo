// "use client";

import { useQuery, gql } from '@apollo/client';
import { getClient } from "../lib/ApolloClient"; // Adjust the import path as necessary

const GET_BOOKS = gql`
  query GetBooks {
    books {
      title
      author {
        name
      }
    }
  }
`;

export default async function Home() {

    const { data, loading } = await getClient().query({
    query: GET_BOOKS,
    // context: { fetchOptions: { cache: "no-store" } }, // to disable caching
  });
  
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
    <h1 className="mb-8 text-4xl font-bold">GraphQL Example</h1>
    {loading && <p>Loading...</p>}
    {data?.books?.map((book, index) => (
      <div key={index} className="p-4 mb-4 border rounded shadow">
        <h2 className="text-2xl">{book.title}</h2>
        <p>Author: {book.author.name}</p>
      </div>
    ))}
    </main>
  );
}
