// src/app/store.js   অথবা src/store/index.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

import userReducer from "./userSlice.js"; // path ঠিক করে নিও

const persistConfig = {
  key: "Minecraft-Temple",
  version: 1,
  storage,
  whitelist: ["user"], // শুধু user persist হবে (পরে আরো slice যোগ করলে whitelist-এ রাখো)
  // blacklist: ['someTempSlice'] // যদি কোনো slice persist না করতে চাও
};

const rootReducer = combineReducers({
  user: userReducer,
  // cart: cartReducer,     // পরে যোগ করতে পারো
  // theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // devTools: process.env.NODE_ENV !== 'production',   // optional — default true
});

// এটা খুব জরুরি — PersistGate-এর জন্য
export const persistor = persistStore(store);