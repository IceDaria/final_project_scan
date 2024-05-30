import { createSlice } from '@reduxjs/toolkit';
import { PostDocuments } from '@/api/documents';
import { DocumentsState } from '@/Shared/types';

const initialState: DocumentsState = {
    data: [],
    status: 'idle',
    error: null,
    shownDocs: 10
};

// Создаём срез для редюсера для получения документов(статей) из АПИ
const documentsReducer = createSlice({
    name: 'documents',
    initialState,
    reducers: {
        // Редюсер для отображения документов
        showDocs: (state, action) => {
            state.shownDocs += action.payload; // Увеличиваем количество отображаемых документов на указанное значение
        },
        // Редюсер для установки начального количества отображаемых документов
        setInitialShownDocs: (state, action) => {
            state.shownDocs = action.payload; // Установка начального количества отображаемых документов
        }
    },
    extraReducers: (builder) => {
        builder
            // Обработчики дополнительных действий (отправка документов)
            .addCase(PostDocuments.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(PostDocuments.fulfilled, (state, { payload }) => {
                state.data = [...payload] // Сохраняем полученные документы
                state.status = 'succeeded';
            })
            .addCase(PostDocuments.rejected, (state, { payload }) => {
                state.status = 'failed';
                if (payload) {
                    state.error = payload.message; // Установка ошибки, если она есть
                }
        });
    }
});

export const { showDocs, setInitialShownDocs } = documentsReducer.actions;
export default documentsReducer.reducer;