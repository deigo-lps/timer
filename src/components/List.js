import React, { useContext } from "react";
import ItemsContext from "../store/items-context";
import Card from "./Card";
import "./List.scss";
import ListItem from "./ListItem";

export default function List() {
  const ctx = useContext(ItemsContext);
  return (
    <ul className="list">
      {ctx.items.length !== 0 ? (
        ctx.items.map((item) => <ListItem item={item} key={item.key} />)
      ) : (
        <Card>
          <p>sem itens.</p>
        </Card>
      )}
    </ul>
  );
}
