import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";

const CURRENT_USER_QUERY = gql`
  query {
    CurrentUser {
      id
      email
      name
      permissions
    }
  }
`;

const loggedUser = props => {
  return (
    <Query {...props} query={CURRENT_USER_QUERY}>
      {payload => props.children(payload)}
    </Query>
  );
};

loggedUser.propTypes = {
  children: PropTypes.func.isRequired
};

export default loggedUser;
export { CURRENT_USER_QUERY };
