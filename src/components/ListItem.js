import React, { useEffect, useState } from "react";
import { useBeforeunload } from "react-beforeunload";
import Card from "./Card";

import { useDispatch } from "react-redux";
import { itemsActions } from "../store";

const play = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
    {/* Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
    <path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
  </svg>
);
const pause = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
    {/* Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}{" "}
    <path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z" />
  </svg>
);


const ListItem = (props) => {
  const dispatch = useDispatch();
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState({
    h: props.item.time.h,
    m: props.item.time.m,
    s: props.item.time.s,
  });

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

  const updateHandler = () => {
    dispatch(
      itemsActions.updateItem({
        key: props.item.key,
        name: props.item.name,
        time: {
          h: time.h,
          m: time.m,
          s: time.s,
        },
      })
    );
  };

  useBeforeunload(() => {
    updateHandler();
  });

  const handleInit = () => {
    setStarted((started) => !started);
    if (started) {
      updateHandler();
    }
  };

  const deleteHandler = () => {
    dispatch(
      itemsActions.deleteItem(props.item.key)
    );
  };

  const convert = (string) => ("0" + string.toString()).slice(-2);

  return (
    <li>
      <Card>
        <p>{props.item.name}</p>
        <div>
          <p>
            {convert(time.h)}:{convert(time.m)}:{convert(time.s)}
          </p>
          <button onClick={handleInit}>{started ? pause : play}</button>
          <button onClick={deleteHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              {/* Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
              <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
            </svg>
          </button>
        </div>
      </Card>
    </li>
  );
};

export default ListItem;
