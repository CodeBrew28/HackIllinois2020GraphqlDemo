import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import React from "react";
import { render } from "react-dom";

import AllAttendees from "./components/AllAttendees.js";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql"
});

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <AllAttendees />
    </div>
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));
