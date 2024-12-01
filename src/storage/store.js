import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { VogueKartReducer } from "./reducer";

// redux persist config
const persistConfig = {
    key : 'VogueKartAdmin',
    storage: AsyncStorage,
};

//  middleware: Redux persist persisted reducer
 const persistedReducer = persistReducer(persistConfig, VogueKartReducer);

//  redux: store
const store = configureStore({
    reducer : persistedReducer,
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
});

//  middleware: Redux persist persisted
let persister = persistStore(store);

// export
export {store, persister};