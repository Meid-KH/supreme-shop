import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./LoggedUser";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      name
      email
      permissions
    }
  }
`;

class Signin extends Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const { email, password } = this.state;
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { loading, error }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await signin();
              this.setState({ email: "", password: "" });
            }}
          >
            <h2>Sign in to your Account </h2>
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
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
              <button type="submit">Sign In</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signin;
