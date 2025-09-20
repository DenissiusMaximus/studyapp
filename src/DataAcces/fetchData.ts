import {WordCollection} from "../Store/types";

interface IGraphQLTodosResponse {
    data?: {
        wordsCollection?: WordCollection[];
        wordsCollectionById?: WordCollection;
        createWordCollection?: WordCollection;
    };
    errors?: { message: string }[];
}
export async function fetchData(query: string): Promise<IGraphQLTodosResponse | undefined> {
    try {
        const response = await fetch("/graphql", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: IGraphQLTodosResponse = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}