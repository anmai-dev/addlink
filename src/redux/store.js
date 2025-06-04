import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import authReducer from './Slice/authSlice';
// import authReducer from "./authSlice";
// import userReducer from "./Slice/userslice";
import userReducer from "./Slice/UserSlice";
import linkReducer from "./Slice/LinkSlice";
import authReducer from "./Slice/AuthSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Cấu hình persist
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ["User", "Link", "Auth"],
};

// Kết hợp các reducers
const rootReducer = combineReducers({
    // Auth: authReducer,
    User: userReducer,
    Link: linkReducer,
    Auth: authReducer,
    // Post: postReducer,

});

// Áp dụng persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Tạo persistor
export let persistor = persistStore(store);