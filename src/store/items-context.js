import React,{useState} from "react";

const ItemsContext = React.createContext({
  items:[],
  addHandler: () => {},
  deleteHandler: ()=>{}
})

export const ItemsContestProvider = (props) =>{
  const [items,setItems] = useState([]);

  const addHandler = (item) =>{
    setItems(items=>[item,...items]);
  }
  const deleteHandler = (key) =>{
    setItems(items=>items.filter(item=>item.key!==key));
  }

  return(
    <ItemsContext.Provider value={{
      items: items,
      addHandler: addHandler,
      deleteHandler: deleteHandler
    }}>
      {props.children}
    </ItemsContext.Provider>
  )
}

export default ItemsContext;