import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { apiSlice } from "../auth/APIslice";
import authReducer from "../auth/AuthSlice";


export const persistConfig = {
    key: "root",
    version: 1,
    storage,
    purge: ['auth']
};

const rootReducer = combineReducers({
    auth: authReducer,
    api: apiSlice.reducer, // Add the apiSlice reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer); // Use rootReducer

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(apiSlice.middleware),
});

export let persistor = persistStore(store);