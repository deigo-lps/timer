import React, { useRef, useContext } from "react";
import ItemsContext from "../store/items-context";
import Card from "./Card";
import "./Form.scss";
const Form = (props) => {
  const ctx = useContext(ItemsContext);
  const nome = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (nome.current.value.trim() !== "")
      ctx.addHandler({
        key: Math.random(),
        name: nome.current.value,
        time: { h: 0, m: 0, s: 0 },
      });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Card>
        <input ref={nome} placeholder="Nome" />
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            {/*Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.*/}
            <path d="M433.1 129.1l-83.9-83.9C342.3 38.32 327.1 32 316.1 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V163.9C448 152.9 441.7 137.7 433.1 129.1zM224 416c-35.34 0-64-28.66-64-64s28.66-64 64-64s64 28.66 64 64S259.3 416 224 416zM320 208C320 216.8 312.8 224 304 224h-224C71.16 224 64 216.8 64 208v-96C64 103.2 71.16 96 80 96h224C312.8 96 320 103.2 320 112V208z" />
          </svg>
        </button>
      </Card>
    </form>
  );
};

export default Form;
