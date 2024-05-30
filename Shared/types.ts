export interface HistogramParams {
    innField: string;
    tonality: string;
    docslimit: number;
    startDate: string;
    endDate: string;
    checkboxes: boolean[];
}

export interface DocumentParams {
    listEncodedId: string[];
}

// интерфейс для поля ошибок
export interface ErrorResponse {
    message: string;
}

// интерфейсы для редьюсера авторизации и получения данных об аккаунте
export interface EventFiltersInfo {
    usedCompanyCount: number;
    companyLimit: number;
}
  
export interface AccountInfo {
    eventFiltersInfo: EventFiltersInfo;
}
  
export interface Tariff {
    id: number;
    name: string;
}
  
export interface AuthState {
    accessToken: string | null;
    expire: string | null;
    status: 'idle' | 'loading' | 'failed';
    isLogged: boolean;
    error: { field: string, message: string } | null;
    accountInfo: AccountInfo | null; 
    loadingAccountInfo: boolean;
    currentTariff: Tariff | null;
}

// Интерфейс для состояния гистограмм
export interface HistogramState {
    data: any;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    histogramsParams: {
        accessToken: string,
        innField: string,
        tonality: string,
        docslimit: number,
        startDate: string,
        endDate: string,
        checkboxes: boolean[];
    },
}

// Интерфейс для элемента поиска
export interface SearchItem {
    encodedId: string;
}

// Интерфейс для состояния объектного поиска
export interface ObjectsearchState {
    dataObjectsearch: string[];  // Массив строк с encodedId
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Интерфейс для состояния получения документов из АПИ
export interface DocumentsState {
    data: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    shownDocs: number;
}