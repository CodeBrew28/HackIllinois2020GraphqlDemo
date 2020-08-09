const express = require("express");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");

// Example 6: Mutations allow us to change data 
// In this example we are adding an attendee
// mutation m {
//   addAttendee(name: "aria") {
//     id
//     name
//   }
// }


const app = express();
app.use(cors());

const schema = gql`
  type Query {
    allAttendees: [Attendee!]
  }
  type Mutation {
    addAttendee(name: String!): Attendee!
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

var id = 3;

const resolvers = {
  Query: {
    allAttendees: () => {
        return Object.values(allAttendees);
    },
  }, 
  Mutation: {
    addAttendee: (parent, { name }, { me }) => {
      const attendee = {
        id,
        name,
      };
      id = id + 1
      allAttendees[id] = attendee;
      return attendee;
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 8000 }, () => {
  console.log("Apollo Server on http://localhost:8000/graphql");
});