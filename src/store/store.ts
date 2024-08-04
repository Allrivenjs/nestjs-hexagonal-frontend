import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import storage from 'redux-persist/lib/storage'; // Usa localStorage
import { persistStore, persistReducer } from 'redux-persist';

// Configuración de persistencia
const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, productsReducer);


const store = configureStore({
    reducer: {
        products: persistedReducer,
    }
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;