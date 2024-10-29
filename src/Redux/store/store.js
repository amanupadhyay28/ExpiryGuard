import { configureStore } from "@reduxjs/toolkit";
import { api } from "../../services/common/index";
import rootReducer from "../reducers";

const store = configureStore({
  reducer: {
    rootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});

export const AppDispatch = store.dispatch;

export const RootState = store.getState;
export default store;
