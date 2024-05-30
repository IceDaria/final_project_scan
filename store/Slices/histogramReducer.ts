import { HistogramState } from "@/Shared/types";
import { PostHistograms } from "@/api/histogram";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
  
const initialState: HistogramState = {
    data: [],
    status: 'idle',
    error: null,
    histogramsParams: {
        accessToken: '',
        innField: '',
        tonality: 'any',
        docslimit: 0,
        startDate: '',
        endDate: '',
        checkboxes: Array(7).fill(false),
    },
};
  
// Создаём срез для редюсера для получения гистограмм из АПИ
const histogramReducer = createSlice({
    name: 'histograms', 
    initialState,
    reducers: {
        // Редюсер для изменения значения поля ИНН
        innReducer: (state, action) => {
            state.histogramsParams = {
                ...state.histogramsParams,
                innField: action.payload
            };
        },
        // Редюсер для изменения значения тональности
        tonalityReducer: (state, action) => {
            state.histogramsParams = {
                ...state.histogramsParams,
                tonality: action.payload
            };
        },

        // Редюсер для изменения лимита документов
        docslimitReducer: (state, action) => {
            state.histogramsParams = {
                ...state.histogramsParams,
                docslimit: action.payload
            };
        },

        // Редюсер для установки значения чекбокса
        setCheckbox: (state, action: PayloadAction<{ index: number; checked: boolean }>) => {
            const newCheckboxes = [...state.histogramsParams.checkboxes];
            newCheckboxes[action.payload.index] = action.payload.checked;
            state.histogramsParams.checkboxes = newCheckboxes;
        },

        // Редюсер для изменения начальной даты
        startDateReducer: (state, action) => {
            state.histogramsParams = {
                ...state.histogramsParams,
                startDate: action.payload
            };
        },

        // Редюсер для изменения конечной даты
        endDateReducer: (state, action) => {
            state.histogramsParams = {
                ...state.histogramsParams,
                endDate: action.payload
            };
        },

        // Редюсер для сброса формы в начальное состояние
        resetFormReducer: (state) => {
            state.histogramsParams = {
                accessToken: '',
                innField: '',
                tonality: 'any',
                docslimit: 0,
                startDate: '',
                endDate: '',
                checkboxes: Array(7).fill(false),
            };
        },
    },

    // Дополнительные редюсеры для обработки асинхронных действий
    extraReducers: (builder) => {
      builder
        .addCase(PostHistograms.pending, (state) => {
          state.status = 'loading'; // Установка статуса "загрузка" при начале запроса
          state.error = null;
        })
        .addCase(PostHistograms.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.data = action.payload; // Установка полученных данных
          state.error = null;
        })
        .addCase(PostHistograms.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload?.message || 'Ошибка загрузки'; // Установка ошибки, если есть
        });
    },
  });

export const {
    innReducer,
    tonalityReducer,
    docslimitReducer,
    startDateReducer,
    endDateReducer,
    setCheckbox,
    resetFormReducer
} = histogramReducer.actions;

export default histogramReducer.reducer;