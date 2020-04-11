import Link from "next/link";
import LoggedUser from "./LoggedUser";

import NavStyles from "./styles/NavStyles";

const Nav = () => (
  <LoggedUser>
    {({ data: { CurrentUser } }) => (
      <NavStyles>
        <Link href="/items">
          <a>Shop</a>
        </Link>
        {CurrentUser && (
          <>
            <Link href="/sell">
              <a>Sell</a>
            </Link>
            <Link href="/orders">
              <a>Orders</a>
            </Link>
            <Link href="/me">
              <a>Account</a>
            </Link>
          </>
        )}
        {!CurrentUser && (
          <Link href="/signup">
            <a>Signup</a>
          </Link>
        )}
      </NavStyles>
    )}
  </LoggedUser>
);

export default Nav;
