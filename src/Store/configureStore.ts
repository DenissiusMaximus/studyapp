import {createEpicMiddleware} from "redux-observable";
import {rootEpic, rootReducer} from "./root";
import {WordCollectionRepository} from "../DataAcces/wordCollectionRepository";
import {IDependencies} from "./dependencies";
import {configureStore} from "@reduxjs/toolkit";

const epicMiddleware = createEpicMiddleware<any, any, any, IDependencies>({
    dependencies: { repo: new WordCollectionRepository() }
});

export function configureAppStore() {
    const store = configureStore({
        reducer: rootReducer,

        middleware: (getDefault) =>
            getDefault({ thunk: false }).concat(epicMiddleware),
        devTools: true
    });

    epicMiddleware.run(rootEpic);
    return store;
}

export const store = configureAppStore();
