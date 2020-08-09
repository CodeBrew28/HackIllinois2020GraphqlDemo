const express = require("express");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");

// Example 4: Creating an field that returns a list of items
// We want to fetch a list of all attendees
// {
//   allAttendees {
//     name
//   }
// }


const app = express();
app.use(cors());

const schema = gql`
  type Query {
    allAttendees: [Attendee!]
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
    allAttendees: () => {
        return Object.values(allAttendees);
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