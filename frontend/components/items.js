import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Item from "./Item";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      description
      price
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;
const ListItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  /* max-width: ${props => props.theme.maxWidth}; */
  margin: 0 auto;
`;

// const styled.div =

class Items extends Component {
  render() {
    return (
      <Center>
        <Query query={ALL_ITEMS_QUERY}>
          {({ data, error, loading }) => {
            // console.log(data.items);

            // if there are errors
            if (error) return <p>Errors : {error.message}</p>;
            // if it's loading
            if (loading) return <p>Loading ...</p>;
            // If it's ready !
            return (
              <ListItem>
                {data.items.map(item => (
                  <Item key={item.id} ItemData={item} />
                ))}
              </ListItem>
            );
          }}
        </Query>
      </Center>
    );
  }
}

export default Items;
export { ALL_ITEMS_QUERY };
