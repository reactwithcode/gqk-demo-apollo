import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import axios from 'axios';

// 1. Your Type Definitions (Schema)
const typeDefs = gql`
  type Person {
    name: String
    age: Int
  }

  type Book {
    title: String
    author: Person
  }

  type githubUser {
    id: ID
    login: String
    avatar_url: String
  }

  input PersonInput {
    name: String
    age: Int
  }

  type Query {
    books: [Book]
    people: [Person]
    getUsers: [githubUser]
  }

  type Mutation {
    addBook(title: String, author: PersonInput): Book
  }
`;

// 2. Your In-Memory Data
const books = [
  {
    title: 'The Awakening',
    author: {
        name: 'Hari',    
        age: 30,
    },
  },
  {
    title: 'City of Glass',
    author: {
      name: 'Paul Auster',
      age: 73,
    },
  },
];

const people = [
  {
    name: 'Hari',    
    age: 30,
  },
  {
    name: 'Jane Smith',
    age: 25,
  },
];


// 3. Your Resolvers
const resolvers = {
  Query: {
    books: () => books,
    people: () => people,
    getUsers: async () => {
      try {
        const users = await axios.get("https://api.github.com/users");
        return users.data.map(({ id, login, avatar_url }) => ({
          id,
          login,
          avatar_url,
        }));
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    addBook: (parent, { title, author }) => {
      const newBook = {
        id: String(books.length + 1), // Simple ID generation
        title: title,
        author: {
          name: author.name,
          age: author.age,
        },
      };
      books.push(newBook);
      return newBook;
    },
  },
};

// 4. Create the Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// 5. Create the Next.js request handler
const handler = startServerAndCreateNextHandler(server);

const config = {
  api: {
    bodyParser: true, // Disable body parsing to handle GraphQL requests
  },
};

// 6. Export the handler for GET and POST requests
export { handler as GET, handler as POST, config };