export type Word = {
    id?: number;
    name: string;
    definition?: string;
};

export type WordCollection ={
    id: number;
    parentId?: number;
    childrenId?: number;
    name: string;
    description?: string;
    color?: string;
    createdAt?: string;
    wordsList: Word[];
}
