import {createWordCollectionEpic, fetchWordCollectionByIdEpic, fetchWordCollectionsEpic} from "./epics";
import {combineEpics} from "redux-observable";
import {combineReducers} from "redux";
import {wordCollectionsReducer} from "./wordCollectionsSlice";

export const rootEpic = combineEpics(
    fetchWordCollectionsEpic,
    fetchWordCollectionByIdEpic,
    createWordCollectionEpic,
);

export const rootReducer = combineReducers({
   wordCollections: wordCollectionsReducer
});