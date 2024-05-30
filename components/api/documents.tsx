import { DocumentParams, ErrorResponse } from "@/Shared/types";
import { RootState } from "@/store/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const PostDocuments = createAsyncThunk<any, DocumentParams, { rejectValue: ErrorResponse }>(
    "documents/postDocuments", 
    async ({ listEncodedId }, thunkApi) => { 
        try {
            const { getState } = thunkApi;
            const state = getState() as RootState;
            const { accessToken } = state.auth;

            // Отправка POST запроса для загрузки документов
            const response = await fetch(`https://gateway.scan-interfax.ru/api/v1/documents`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ "ids": listEncodedId })
            });

            if (!response.ok) {
                // Обработка ошибки, если запрос не успешен
                const errorData = await response.json();
                return thunkApi.rejectWithValue({ message: errorData.message || 'Ошибка загрузки' });
            }

            // Обработка успешного ответа и возвращение данных
            const data = await response.json();
            console.log('Успешный ответ Documents:', data);
            return data;
        } catch (error) {
            // Обработка ошибок, возникающих во время выполнения запроса
            const message = error instanceof Error ? error.message : 'Ошибка загрузки';
            return thunkApi.rejectWithValue({ message });
        }
    }
);