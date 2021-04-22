import { combineReducers } from "redux";

// import ProductListReducer from "./productListReducer";
// import ShoppingListReducer from "./shoppingListReducer";
import UserReducer from "./user";
// import AdminReducer from "./adminReducer";

const rootReducer = combineReducers({
  User: UserReducer,
});

export default rootReducer;
