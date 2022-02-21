import React, { useEffect, useState } from "react";

const ItemsContext = React.createContext({
  items: [],
  addHandler: () => {},
  deleteHandler: () => {},
  updateHandler: () => {},
});

export const ItemsContestProvider = (props) => {
  const [items, setItems] = useState([]);

  const addHandler = (item) => {
    setItems((items) => [item, ...items]);
  };
  
  const deleteHandler = (key) => {
    setItems((items) => items.filter((item) => item.key !== key));
  };

  const updateHandler = (item) => {
    setItems((items) => {
      var newItems = [...items].filter((obj) => obj.key != item.key);
      newItems.push(item);
      return newItems;
    });
  };

  return (
    <ItemsContext.Provider
      value={{
        items: items,
        addHandler: addHandler,
        deleteHandler: deleteHandler,
        updateHandler: updateHandler,
      }}
    >
      {props.children}
    </ItemsContext.Provider>
  );
};

export default ItemsContext;
