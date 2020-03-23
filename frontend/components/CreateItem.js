import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";

//   Create item Mutation string
const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: "Pitbull, Mr. Wordlwide",
    description: "This is a geant Pibull !",
    image: "dog.jpg",
    largeImage: "large-dog.jpg",
    price: 0
  };

  // handle input change
  handleChange = event => {
    // console.log(event.target);
    const { name, type, value } = event.target;
    const val = type === "number" ? parseFloat(value) : value;

    this.setState({
      [name]: val
    });
  };

  // Handle the file upload
  uploadFile = async event => {
    const files = event.target.files;
    console.log(files);
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "supreme-shop");
    // the file upload response
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/supreme-shop/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();
    console.log(file);
    console.log(this.state);

    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };

  render() {
    const { title, description, price } = this.state;
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => {
          return (
            <Form
              onSubmit={async event => {
                event.preventDefault();
                const response = await createItem();
                console.log(response);
                // Redirect to the Created item page
                Router.push({
                  pathname: "/item",
                  query: { id: response.data.createItem.id }
                });
              }}
              mutation={createItem}
            >
              <Error error={error} />
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="file">
                  Image
                  <input
                    type="file"
                    id="file"
                    name="file"
                    placeholder="Upload an image"
                    required
                    onChange={this.uploadFile}
                  />
                  {this.state.image && (
                    <img
                      width="200"
                      src={this.state.image}
                      alt="Upload Preview"
                    />
                  )}
                </label>
                <label htmlFor="title">
                  Title
                  <input
                    type="text"
                    name="title"
                    value={title}
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
                    value={price}
                    placeholder="Price .."
                    required
                    onChange={this.handleChange}
                  />
                  <label htmlFor="description">
                    Description
                    <textarea
                      name="description"
                      value={description}
                      placeholder="Description .."
                      required
                      onChange={this.handleChange}
                      rows="8"
                    />
                  </label>
                </label>
                <button type="submit">Create</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default CreateItem;
