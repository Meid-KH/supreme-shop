import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./LoggedUser";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signup(name: $name, email: $email, password: $password) {
      id
      name
      email
      password
      permissions
    }
  }
`;

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: ""
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const { name, email, password } = this.state;
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { data, loading, error }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await signup();
              this.setState({ name: "", email: "", password: "" });
            }}
          >
            <h2>Sign Up for An Account </h2>
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="name">
                <input
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Name.."
                  required
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="email">
                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email.."
                  required
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="password">
                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password.."
                  required
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Sign Up</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signup;
