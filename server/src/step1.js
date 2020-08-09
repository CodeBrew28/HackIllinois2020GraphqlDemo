const express = require("express");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");

// Example 1: Querying a field
// We want to create a query where we can fetch an attendee's name
// {
//   attendee
// }

const app = express();
app.use(cors());

const schema = gql`
  type Query {
    attendee: String!
  }
`;

const resolvers = {
  Query: {
    attendee: () => {
      return "John";
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 8000 }, () => {
  console.log("Apollo Server on http://localhost:8000/graphql");
});