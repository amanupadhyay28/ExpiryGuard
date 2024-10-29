import authReducer from "./auth";
import { api } from "../../services/common";

const rootReducer = {
  auth: authReducer,
  [api.reducerPath]: api.reducer,
};
export default rootReducer;
