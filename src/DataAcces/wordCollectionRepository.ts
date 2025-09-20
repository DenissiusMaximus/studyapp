import {fetchData} from "./fetchData";
import {WordCollection} from "../Store/types";

export interface IWordCollectionRepository {
    getAll(): Promise<WordCollection[]>;
    getById(id: string): Promise<WordCollection | null>;
    createCollection(collection: WordCollection): Promise<WordCollection | null>;
}

export class WordCollectionRepository implements IWordCollectionRepository {
    public async getAll(): Promise<WordCollection[]> {
        const query = `
            query {
              wordsCollection {
                id
                name
                description
                parentId
                color
                wordsList {
                  id
                  name
                  definition
                }
              }
            }
        `;

        const resp = await fetchData(query);

        console.log(resp);

        return resp?.data?.wordsCollection ?? [];

    }

    public async getById(id: string): Promise<WordCollection | null> {
        const query = `
            query {
              wordsCollectionById(id: ${JSON.stringify(id)}) {
                  id
                name
                description
                parentId
                color
                wordsList {
                  id
                  name
                  definition
                }
              }
            }
                    `;

        const resp = await fetchData(query);

        console.log('rep', resp);

        return resp?.data?.wordsCollectionById ?? null;

    }

    public async createCollection(collection: WordCollection) {
        const query = `
            mutation {
              createWordCollection(
                name: ${JSON.stringify(collection.name)}
                description: ${JSON.stringify(collection.description)}
                color: ${JSON.stringify(collection.color)}
                wordsList: [
                ${collection.wordsList ? collection.wordsList.map(word => `{ name: ${JSON.stringify(word.name)}, definition: ${JSON.stringify(word.definition)} }`).join(',') : ''}
                ]
              ) {
                id
                name
                color
                description
                wordsList { id name definition }
              }
            }
                    `;

        const resp = await fetchData(query);

        console.log('create', resp);

        return resp?.data?.createWordCollection ?? null;

    }

}
