import React, { useRef, useContext } from "react";
import ItemsContext from "../store/items-context"
import "./Form.scss";
const Form = (props) => {
  const ctx = useContext(ItemsContext);
  const nome = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    ctx.addHandler({
      key: Math.random(),
      name:nome.current.value,
      time: {h:0,m:0,s:0}
    })
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input ref={nome} placeholder="Nome" />
      <button>Salvar</button>
    </form>
  );
};

export default Form;
