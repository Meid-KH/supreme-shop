import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Error from "./ErrorMessage";
import { ALL_ITEMS_QUERY } from "./Items";

// Delete item query
const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the items we want
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    console.log(data, payload);
    // 2. Filter the deleted item out of the page
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    // 3. Put the items back!
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: this.props.itemId }}
        update={this.update}
      >
        {(deleteItem, { error, loading }) => {
          if (error) return <p>{error.message}</p>;
          if (loading) return <p>loading ...</p>;
          return (
            <button
              onClick={() => {
                // console.log("DEL" + this.props.itemId);
                if (confirm("Are you sure you want to delete this item?")) {
                  deleteItem();
                }
              }}
            >
              {this.props.children}
            </button>
          );
        }}
      </Mutation>
    );
  }
}

export default DeleteItem;
