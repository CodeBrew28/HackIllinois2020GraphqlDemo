const express = require("express");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");

// Example 5: Objects can return objects, allowing us to nest more complex data 
// A attendee can have a teammate that is another attendee
// {
//  allAttendees {
//   name
//   id
//   teammate {
//     id
//     name
//   }
// }
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
    teammate: Attendee!
  }
`;

const allAttendees = {
  1: {
    id: "1",
    name: "John",
    teammate: {
        id: "2",
        name: "Bob",
    }
  },
  2: {
    id: "2",
    name: "Bob",
    teammate: {
        id: "1",
        name: "John",
    }
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