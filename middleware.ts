import { applyMiddleware, createStore } from "redux";

const store = createStore(()=>[], {}, applyMiddleware());