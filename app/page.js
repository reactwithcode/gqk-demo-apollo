/* "use client";

import { useQuery, gql } from '@apollo/client'; */
import { gql } from '@apollo/client';
import { getClient } from "@/lib/ApolloClient"; // Adjust path if needed

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
  // const { loading, error, data } = useQuery(GET_BOOKS);

   const { loading, error, data } = await getClient().query({
    query: GET_BOOKS,
    // You can configure caching and revalidation here
    // context: {
    //   fetchOptions: {
    //     next: { revalidate: 60 }, // Revalidate every 60 seconds
    //   },
    // },
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
