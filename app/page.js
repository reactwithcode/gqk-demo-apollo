/* "use client";

import { useQuery, gql } from '@apollo/client'; */
import { gql } from '@apollo/client';
import { getClient } from "@/lib/ApolloClient"; // Adjust path if needed
import { AddBookForm } from './components/AddBookForm';

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

  console.log("Data fetched:", data);
  console.log(process.env.HOSTNAME);
  
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
    <h1 className="mb-8 text-4xl font-bold">GraphQL Example</h1>

    <AddBookForm />

      <div className="w-full max-w-lg mt-8 text-black">
        <h2 className="mb-4 text-3xl font-semibold">Available Books</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error loading books: {error.message}</p>}
        {data?.books?.map((book, index) => (
          <div key={index} className="p-4 mb-4 border rounded shadow bg-gray-50">
            <h3 className="text-2xl">{book.title}</h3>
            <p>by {book.author.name}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
