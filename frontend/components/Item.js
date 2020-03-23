import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Title from "./styles/Title";
import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";
import DeleteItem from "../components/DeleteItem";

class Item extends Component {
  static propTypes = {
    ItemData: PropTypes.object.isRequired
  };

  render() {
    const { ItemData } = this.props;
    const { id, title, description, price, image } = ItemData;
    return (
      <ItemStyles>
        {image && <img src={image} alt={title} />}

        <Title>
          <Link
            href={{
              pathname: "/item",
              query: { id: id }
            }}
          >
            <a>{title}</a>
          </Link>
        </Title>
        <PriceTag>{formatMoney(price)}</PriceTag>
        <p>{description}</p>

        <div className="buttonList">
          <Link
            href={{
              pathname: "update",
              query: { id: id }
            }}
          >
            <a>Edit ✏️</a>
          </Link>
          <button>Add To Cart</button>
          <DeleteItem itemId={id}>Delete</DeleteItem>
        </div>
      </ItemStyles>
    );
  }
}

export default Item;
