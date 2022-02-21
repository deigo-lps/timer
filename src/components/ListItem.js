import React, { useEffect, useState, useContext } from "react";
import ItemsContext from "../store/items-context";
const ListItem = (props) =>{
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(props.item.time)
  const ctx = useContext(ItemsContext);

  useEffect(()=>{
    let interval
    if(started){
      interval = setInterval(()=>{setTime(time=>time+1)},1000);
    }
    else{
      clearInterval(interval);
    }
    return ()=>{
      clearInterval(interval)
    };
  },[started])

  const handleInit = () => {
    setStarted(started => !started);
  };

  const deleteHandler = () =>{
    ctx.deleteHandler(props.item.key)
  }

  return (
    <li>
      <p>{props.item.name}</p>
      <div>
        <p>{time}</p>
        <button onClick={handleInit}>{started ? 'Pausar' : 'Iniciar'}</button>
        <button onClick={deleteHandler}>Deletar</button>
      </div>
    </li>
  );
}

export default ListItem
