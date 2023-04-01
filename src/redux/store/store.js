import { combineReducers, configureStore } from "@reduxjs/toolkit";

import dataReducer from "../data/dataSlice";
import { writeJsonData } from "../utils/jsonUtils";

const rootReducer = combineReducers({
  data: dataReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

store.subscribe(() => {
  const state = store.getState().data;
  writeJsonData("tasks", state.tasks);
  writeJsonData("subtasks", state.subtasks);
});

export default store;
