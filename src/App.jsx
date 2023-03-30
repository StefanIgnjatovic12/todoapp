import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { TaskList } from "./components/TaskList/TaskList";

function App() {
  return (
    <Provider store={store}>
      <TaskList />
    </Provider>
  );
}

export default App;
