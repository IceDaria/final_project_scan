import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "./histogram";
import { RootState } from "@/store/store";
import { ErrorResponse, HistogramParams } from "@/Shared/types";

export const PostObjectSearch = createAsyncThunk<any, HistogramParams, { rejectValue: ErrorResponse; state: RootState }>(
    'objectsearch/postObjectsearch',
    async (params, thunkApi) => {
        return fetchData('https://gateway.scan-interfax.ru/api/v1/objectsearch', params, thunkApi);
    }
);