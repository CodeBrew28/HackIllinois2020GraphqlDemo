const express = require("express");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");

// Example 3: Creating an field with args
// We want to be able to pass in a variable (id) to determine which
// attendee we fetch.
// {
//   attendees(id:1) {
//     name
//   }
// }

const app = express();
app.use(cors());

const schema = gql`
  type Query {
    attendees(id: ID!): Attendee!
  }
  type Attendee {
    id: ID!
    name: String!
  }
`;

const allAttendees = {
    1: {
      id: "1",
      name: "John"
    },
    2: {
      id: "2",
      name: "Bob"
    }
  };

const resolvers = {
  Query: {
    attendees: (parents, {id}) => {
        return allAttendees[id];
    },
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