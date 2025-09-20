import {Epic, ofType} from "redux-observable";
import {wordCollectionsActions} from "./wordCollectionsSlice";
import {catchError, from, map, mergeMap, of} from "rxjs";
import {IDependencies} from "./dependencies";

export const fetchWordCollectionsEpic: Epic<any, any, any, IDependencies> = (action$, state$, {repo}) =>
    action$.pipe(
        ofType(wordCollectionsActions.fetchAllRequest.type),
        mergeMap(() =>
            from(repo.getAll()).pipe(
                map(list => wordCollectionsActions.fetchAllSuccess(list)),
                catchError(err => of(wordCollectionsActions.fetchAllFail(err?.message ?? 'Unknown error')))
            )
        )
    );

export const fetchWordCollectionByIdEpic: Epic<any, any, any, IDependencies> = (action$, state$, {repo}) =>
    action$.pipe(
        ofType(wordCollectionsActions.fetchByIdRequest.type),
        mergeMap(action =>
            from(repo.getById(action.payload)).pipe(
                map(collection => wordCollectionsActions.fetchByIdSuccess(collection)),
                catchError(err => of(wordCollectionsActions.fetchByIdFail(err?.message ?? 'Unknown error')))
            )
        )
    );

export const createWordCollectionEpic: Epic<any, any, any, IDependencies> = (action$, state$, {repo}) =>
    action$.pipe(
        ofType(wordCollectionsActions.createCollection.type),
        mergeMap(action =>
            from(repo.createCollection(action.payload)).pipe(
                map((newCollection) => {
                    console.log('epic', newCollection);
                    if (newCollection) {
                        return wordCollectionsActions.createCollectionSuccess(newCollection);
                    } else {
                        return wordCollectionsActions.createCollectionFail('Failed to create collection');
                    }
                }),
                catchError(err => of(wordCollectionsActions.createCollectionFail(err?.message ?? 'Unknown error')))
            )
        )
    );
