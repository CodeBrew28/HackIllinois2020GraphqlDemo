import React, { Component } from 'react'
import { Query } from "react-apollo";
import gql from "graphql-tag";

const AllAttendees = () => (
  <Query
    query={gql`
      {
        allAttendees {
          name
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
        
      return <div>
        <p> All Attendee Names</p>
          <p> 
            {data.allAttendees.map((attendee) => { return <li> {attendee.name} </li>})}
          </p>
        </div>
    }}
  </Query>
);
export default AllAttendees