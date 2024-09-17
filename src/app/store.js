import { configureStore } from "@reduxjs/toolkit";
import { authApis } from "../services/authApis";
import { taskApis } from '../services/taskApis';
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [authApis.reducerPath]: authApis.reducer,
        [taskApis.reducerPath]: taskApis.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(authApis.middleware, taskApis.middleware)
})

setupListeners(store.dispatch); 