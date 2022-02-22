import React, {useEffect} from "react";
import Card from "./Card";
import "./List.scss";
import ListItem from "./ListItem";

import { useDispatch,useSelector } from "react-redux";
import { itemsActions } from "../store";


export default function List() {
  const dispatch = useDispatch();

  useEffect(() => {
    const newItems = JSON.parse(localStorage.getItem("data"));
    if (newItems) {
      dispatch(
        itemsActions.initItems(newItems)
      )
    }
  }, [dispatch]);

  const items = useSelector((state)=>state.items)
  return (
    <ul className="list">
      {Object.keys(items).length !== 0 ? (
        Object.keys(items).map((key) => (
          <ListItem item={items[key]} key={key} />
        ))
      ) : (
        <Card>
          <p>sem itens.</p>
        </Card>
      )}
    </ul>
  );
}
