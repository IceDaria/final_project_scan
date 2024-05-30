import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authReducer";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import histogramReducer from "./Slices/histogramReducer";
import objectsearchReducer from "./Slices/objectsearchReducer";
import documentsReducer from "./Slices/documentsReducer";

const persistConfig = {
  key: 'root',
  storage,
}

// Комбинируем все редьюсеры
const rootReducer = combineReducers ({
  auth: authReducer,
  histograms: histogramReducer,
  objectsearch: objectsearchReducer,
  docs: documentsReducer
});

// Создаем персистированный редьюсер
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Настраиваем store с персистированным редьюсером и middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
      mmutableCheck: false,
  }),
});

export const persistor = persistStore(store);

export default store;

// Определяем типы RootState и AppDispatch
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;