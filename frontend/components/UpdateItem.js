import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";
// Getting the desired item to updated
const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
      image
      largeImage
    }
  }
`;
//   Update item Mutation string
const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

class UpdateItem extends Component {
  state = {};

  // handle input change
  handleChange = event => {
    // console.log(event.target);
    const { name, type, value } = event.target;
    const val = type === "number" ? parseFloat(value) : value;

    this.setState({
      [name]: val
    });
  };

  // Handle the Update meth
  handleUpdate = async (e, updateItem) => {
    e.preventDefault();
    console.log(this.state);
    const res = await updateItem({
      variables: {
        id: this.props.itemId,
        ...this.state
      }
    });
    console.log("Updated!!");
  };

  render() {
    return (
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{
          id: this.props.itemId
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          //   console.log(data);

          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(updateItem, { loading, error }) => {
                return (
                  <Form onSubmit={e => this.handleUpdate(e, updateItem)}>
                    <Error error={error} />
                    <fieldset disabled={loading} aria-busy={loading}>
                      <label htmlFor="title">
                        Title
                        <input
                          type="text"
                          name="title"
                          defaultValue={data.item.title}
                          placeholder="Title .."
                          required
                          onChange={this.handleChange}
                        />
                      </label>
                      <label htmlFor="price">
                        Price
                        <input
                          type="number"
                          name="price"
                          defaultValue={data.item.price}
                          placeholder="Price .."
                          required
                          onChange={this.handleChange}
                        />
                        <label htmlFor="description">
                          Description
                          <textarea
                            name="description"
                            defaultValue={data.item.description}
                            placeholder="Description .."
                            required
                            onChange={this.handleChange}
                            rows="8"
                          />
                        </label>
                      </label>
                      <button type="submit">
                        Sav{loading ? "ing" : "e"} changes{loading && "..."}
                      </button>
                    </fieldset>
                  </Form>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateItem;
