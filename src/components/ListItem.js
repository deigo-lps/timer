import React, { useEffect, useState, useContext } from "react";
import ItemsContext from "../store/items-context";
const ListItem = (props) => {
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState({
    h: props.item.time.h,
    m: props.item.time.m,
    s: props.item.time.s,
  });
  const ctx = useContext(ItemsContext);

  useEffect(() => {
    let interval;
    if (started) {
      interval = setInterval(() => {
        setTime((time) => {
          var hora = time.h;
          var minuto = time.m;
          var segundo = time.s;
          segundo++;
          if (segundo === 60) {
            segundo = 0;
            minuto++;
          }
          if (minuto === 60) {
            minuto = 0;
            hora++;
          }
          return { h: hora, m: minuto, s: segundo };
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [started, time]);

  const handleInit = () => {
    setStarted((started) => !started);
    if (started) {
      ctx.updateHandler({
        key: props.item.key,
        name: props.item.name,
        time: {
          h: time.h,
          m: time.m,
          s: time.s,
        },
      });
    }
  };

  const deleteHandler = () => {
    ctx.deleteHandler(props.item.key);
  };

  return (
    <li>
      <p>{props.item.name}</p>
      <div>
        <p>
          {time.h}:{time.m}:{time.s}
        </p>
        <button onClick={handleInit}>{started ? "Pausar" : "Iniciar"}</button>
        <button onClick={deleteHandler}>Deletar</button>
      </div>
    </li>
  );
};

export default ListItem;
