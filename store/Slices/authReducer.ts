import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAccountInfo, loginUser } from '@/api/auth';
import { AuthState } from '@/Shared/types';

const initialState: AuthState = {
  accessToken: null,
  expire: null,
  status: 'idle',
  isLogged: false,
  error: null,
  accountInfo: null, 
  loadingAccountInfo: false,
  currentTariff: null,
};

// Создаём срез для редюсера аутентификации
const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Редюсер для выхода из системы
    logout: (state) => {
      state.accessToken = null;
      state.expire = null;
      state.isLogged = false;
      state.error = null;
      state.accountInfo = null;
      state.loadingAccountInfo = false;
      state.currentTariff = null;
    },
  },
  extraReducers: (builder) => {
    builder
     // Обработчики дополнительных действий (аутентификация и получение информации об аккаунте)
     // аутентификация
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // Обработка успешной аутентификации
        state.status = 'idle';
        state.accessToken = action.payload.accessToken;
        state.expire = action.payload.expire;
        state.isLogged = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        // Обработка ошибки аутентификации
        state.status = 'failed';
        state.isLogged = false;
        state.error = action.payload;
      })

      // получения данных об аккаунте
      .addCase(getAccountInfo.pending, (state) => {
        state.loadingAccountInfo = true;
      })
      .addCase(getAccountInfo.fulfilled, (state, action) => {
        // Обработка успешного получения информации об аккаунте
        state.loadingAccountInfo = false;
        state.accountInfo = action.payload.accountInfo; 
        state.currentTariff = action.payload.currentTariff;
      })
      .addCase(getAccountInfo.rejected, (state) => {
        // Обработка ошибки получения информации об аккаунте
        state.loadingAccountInfo = false;
        state.accountInfo = null;
        state.currentTariff = null;
      });
  },
});

export const { logout } = authReducer.actions;

export default authReducer.reducer;