import { createAsyncThunk } from '@reduxjs/toolkit';

// Асинхронное действие для аутентификации пользователя
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({login, password}: { login: string, password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://gateway.scan-interfax.ru/api/v1/account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          login: login,
          password: password
          })
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();

      // Сохранение токена и даты истечения в localStorage
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('expire', data.expire);

      return data;
    } catch (err) {
      return rejectWithValue({ message: 'Network error' });
    }
  }
);

// Функция для получения данных аккаунта
export const getAccountInfo = createAsyncThunk (
    'auth/getAccountInfo',
    async (token: string) => {
      const response = await fetch('https://gateway.scan-interfax.ru/api/v1/account/info', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();

      // Получение данных о тарифе пользователя(ну, иммитация)
      const currentTariff = { id: 3, name: 'Business' };

      return { accountInfo: data, currentTariff };
    }
);