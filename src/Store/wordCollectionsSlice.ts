import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { WordCollection } from './types';


interface WordCollectionState {
    wordCollections: WordCollection[];
    selectedWordCollection?: WordCollection | null;
    loading: boolean;
    error?: string | null;
}

const initialState: WordCollectionState = {
    wordCollections: [],
    selectedWordCollection: null,
    loading: false,
    error: null,
};

const wordCollectionsSlice = createSlice({
    name: "wordCollections",
    initialState,
    reducers: {
        fetchAllRequest: (state) => {
            console.log('fetchAllRequest', state);

            state.loading = true;
            state.error = null;
        },
        fetchAllSuccess: (state, action: PayloadAction<WordCollection[]>) => {
            console.log('fetchAllSuccess', state, action);

            state.loading = false;
            state.wordCollections = action.payload;
        },
        fetchAllFail: (state, action: PayloadAction<string>) => {
            console.log('fetchAllFail', state, action);

            state.loading = false;
            state.error = action.payload;
        },
        fetchByIdRequest: (state, action: PayloadAction<string>) => {
            console.log('fetchWordCollectionByIdRequest', state, action);

            state.loading = true;
            state.error = null;
        },
        fetchByIdSuccess: (state, action: PayloadAction<WordCollection | null>) => {
            console.log('fetchWordCollectionByIdSuccess', state, action);
            state.loading = false;
            state.selectedWordCollection = action.payload;
        },
        fetchByIdFail: (state, action: PayloadAction<string>) => {
            console.log('fetchWordCollectionByIdFail', state, action);

            state.loading = false;
            state.error = action.payload;
        },

        createCollection: (state, action: PayloadAction<WordCollection>) => {
            console.log('createCollection', state, action);

            state.loading = true;
            state.error = null;
        },
        createCollectionSuccess: (state, action: PayloadAction<WordCollection>) => {
            console.log('createCollectionSuccess', state, action);

            state.loading = false;
            state.wordCollections = [...state.wordCollections, action.payload];
            console.log(state.wordCollections);
        },
        createCollectionFail: (state, action: PayloadAction<string>) => {
            console.log('createCollectionFail', state, action);

            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const wordCollectionsActions = wordCollectionsSlice.actions;

export const wordCollectionsReducer = wordCollectionsSlice.reducer;