"use client"; // This is the most important line! It marks this as a Client Component.

import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';

// 1. Define the GraphQL mutation string
const ADD_BOOK_MUTATION = gql`
  mutation CreateBook($title: String!, $author: PersonInput) {
    addBook(title: $title, author: $author) {
      title
      author {
        name
        age
      }
    }
  }
`;

export function AddBookForm() {
  // 2. Set up state for form inputs
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorAge, setAuthorAge] = useState("");

  // 3. Next.js router for refreshing the page
  const router = useRouter();

  // 4. Apollo's useMutation hook
  const [addBook, { data, loading, error }] = useMutation(ADD_BOOK_MUTATION);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // 5. Execute the mutation with variables from the form state
      await addBook({
        variables: {
          title: title,
          author: {
            name: authorName,
            age: parseInt(authorAge, 10) || null, // Ensure age is an integer
          },
        },
      });

      // 6. THE KEY STEP: Refresh the page to re-run the server component query
      router.refresh();

      // Clear the form for the next entry
      setTitle("");
      setAuthorName("");
      setAuthorAge("");

    } catch (e) {
      console.error("Mutation failed", e);
    }
  };

  // 7. Render the form
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg p-6 mb-8 bg-white border rounded-lg shadow-md">
      <h3 className="mb-4 text-2xl font-semibold">Add a New Book</h3>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="authorName" className="block mb-2 text-sm font-medium text-gray-700">Author Name</label>
        <input
          id="authorName"
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          required
          className="w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="authorAge" className="block mb-2 text-sm font-medium text-gray-700">Author Age</label>
        <input
          id="authorAge"
          type="number"
          value={authorAge}
          onChange={(e) => setAuthorAge(e.target.value)}
          className="w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button 
        type="submit" 
        disabled={loading}
        className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Adding Book...' : 'Add Book'}
      </button>
      {error && <p className="mt-4 text-red-600">Error: {error.message}</p>}
    </form>
  );
}