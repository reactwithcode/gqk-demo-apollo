'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
import ApolloWrapper from "./ApolloWrapper"; // Import the wrapper

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {


  return (
      <html lang="en">
        <body className={inter.className}>
          {children}
          {/* <ApolloWrapper>{children}</ApolloWrapper> */}
        </body>
      </html>
  );
}
