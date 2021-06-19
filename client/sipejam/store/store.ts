import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/sagas";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["authReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
