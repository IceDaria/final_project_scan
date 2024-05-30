import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostObjectSearch } from '@/api/objectsearch';
import { ObjectsearchState, SearchItem } from '@/Shared/types';

const initialState: ObjectsearchState = {
    dataObjectsearch: [],
    status: 'idle',
    error: null
};

// Создаём срез для редюсера для побъектного поиска
const objectsearchReducer = createSlice({
    name: 'objectsearchReducer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Обработчики дополнительных действий
        builder
            .addCase(PostObjectSearch.pending, (state) => {
                state.status = 'loading'; // Установка статуса "загрузка" при начале запроса
                state.error = null;
            })
            .addCase(PostObjectSearch.fulfilled, (state, action: PayloadAction<{ items: SearchItem[] }>) => {
                // Обработка успешного ответа
                state.dataObjectsearch = action.payload.items.map((item: SearchItem) => item.encodedId); // Заполнение массива данными
                state.status = 'succeeded';
            })
            .addCase(PostObjectSearch.rejected, (state, action: PayloadAction<{ message: string } | undefined>) => {
                // Обработка ошибки
                state.status = 'failed';
                if (action.payload) {
                    state.error = action.payload.message; // Установка ошибки, если она есть
                }
        });
    }
});

export default objectsearchReducer.reducer;