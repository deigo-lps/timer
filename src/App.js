import React from "react";
import List from "./components/List";
import Form from "./components/Form";
import { ItemsContestProvider } from "./store/items-context";

function App() {
  return (
    <ItemsContestProvider>
      <Form />
      <List></List>
    </ItemsContestProvider>
  );
}

export default App;
