import React, { useEffect, useState } from "react";

const ItemsContext = React.createContext({
  items: [],
  addHandler: () => {},
  deleteHandler: () => {},
  updateHandler: () => {},
});

export const ItemsContestProvider = (props) => {
  const [items, setItems] = useState({});

  useEffect(() => {
    const newItems = JSON.parse(localStorage.getItem("data"));
    if (newItems) {
      setItems(newItems);
    }
  }, []);

  const addHandler = (item) => {
    setItems((items) => {
      var newItems = {...items};
      newItems[item.key]=item;
      return newItems;
    });
  };

  const deleteHandler = (key) => {
    setItems((items) => {
      const newItems={...items};
      delete newItems[key];
      return newItems;
    });
  };

  const updateHandler = (item) => {
    setItems((items) => {
      items[item.key].time=item.time;
      localStorage.setItem("data", JSON.stringify(items));
      return items;
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
