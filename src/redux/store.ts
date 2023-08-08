import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {TypedUseSelectorHook, useDispatch} from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';

import rootReducer, {reducersObj} from './redusers/rootReduser';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: Object.keys(reducersObj),
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleWare =>
    getDefaultMiddleWare({serializableCheck: false}),
});

let persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {store, persistor};
