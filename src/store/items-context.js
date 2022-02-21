import React, { useEffect, useState } from "react";

const ItemsContext = React.createContext({
  items: [],
  addHandler: () => {},
  deleteHandler: () => {},
  updateHandler: () => {},
});

export const ItemsContestProvider = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const newItems = JSON.parse(localStorage.getItem("data"));
    if (newItems) {
      setItems(newItems);
    }
  }, []);

  const addHandler = (item) => {
    setItems((items) => [item, ...items]);
  };

  const deleteHandler = (key) => {
    setItems((items) => {
      var newItems = items.filter((item) => item.key !== key);
      localStorage.setItem("data", JSON.stringify(newItems));
      return newItems;
    });
  };

  const updateHandler = (item) => {
    setItems((items) => {
      var newItems = [...items].filter((obj) => obj.key !== item.key);
      newItems.unshift(item);
      localStorage.setItem("data", JSON.stringify(newItems));
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
