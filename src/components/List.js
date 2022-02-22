import React, { useContext } from "react";
import ItemsContext from "../store/items-context";
import Card from "./Card";
import "./List.scss";
import ListItem from "./ListItem";

export default function List() {
  const ctx = useContext(ItemsContext);
  return (
    <ul className="list">
      {}
      {Object.keys(ctx.items).length !== 0 ? (
        Object.keys(ctx.items).map((key) => (
          <ListItem item={ctx.items[key]} key={key} />
        ))
      ) : (
        <Card>
          <p>sem itens.</p>
        </Card>
      )}
    </ul>
  );
}
