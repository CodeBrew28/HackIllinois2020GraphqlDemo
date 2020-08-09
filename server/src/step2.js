const express = require("express");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");

// Example 2: Creating an object
// We've created a Attendee object with a set of nested fields
// Our queries can be precise and request any of the
// nested fields. 
// {
//   attendee {
//     id
//     name
//   }
// }

const app = express();
app.use(cors());

const schema = gql`
  type Query {
    attendee: Attendee!
  }
  type Attendee {
    id: ID!
    name: String!
  }
`;

const resolvers = {
  Query: {
    attendee: () => {
      return {
        id: 1,
        name: "Aria"
      }
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