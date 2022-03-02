import { useEffect, useState } from "react";
import { PictogramState } from "../components/PictogramConfigurator/state";

const parseItem = (value: string): { state: PictogramState, title: string, created: Date, modified: Date } | undefined => {
    if (value) {
        try {
            const data = JSON.parse(value);

            return {
                ...data,
                created: new Date(data.created),
                modified: new Date(data.modified),
            };
        } catch { }
    }
}

export const loadPictogram = (id: string, version: string): PictogramState | undefined => {
    const data = localStorage.getItem(`picto:${id}:${version}`);

    if (data) {
        return parseItem(data)?.state;
    }
}

export type CollectionItem = {
    id: number,
    version: string,
    state: PictogramState,
    title: string,
    created: Date,
    modified: Date,
};

export type Collection = {
    [key: string]: CollectionItem,
};

export const useCollection = () => {
    const [collection, setCollection] = useState<Collection>({});

    useEffect(() => {
        const collection: Collection = {};

        for (const [key, value] of Object.entries(localStorage)) {
            const match = key.match(/^picto:(\d+):([-a-z0-9]+)/);

            if (!match) {
                continue;
            }

            const [, stringId, version] = match;
            const id = parseInt(stringId, 10);
            const data = parseItem(value);

            if (data) {
                collection[key] = { id, version, ...data };
            }
        }

        setCollection(collection);
    }, []);

    return {
        content: collection,
        size: Object.keys(collection).length,
        count: (id: number) => Object.keys(collection).filter(key => key.startsWith(`picto:${id}:`)).length,
        store: (id: string, version: string, state: PictogramState, title?: string) => {
            const key = `picto:${id}:${version}`;
            const data = {
                state,
                title: title || collection[key]?.title || '',
                created: collection[key]?.created || new Date(),
                modified: new Date(),
            }

            localStorage.setItem(key, JSON.stringify(data));

            setCollection({
                ...collection,
                [key]: {
                    id: parseInt(id, 10),
                    version,
                    ...data,
                },
            });
        },
        delete: (id: string, version: string) => {
            const key = `picto:${id}:${version}`;

            localStorage.removeItem(key);

            const newCollection = { ...collection };
            delete newCollection[key];
            setCollection(newCollection);
        },
        deleteAll: () => {
            const keys = Object.keys(collection);

            keys.forEach(key => localStorage.removeItem(key));

            setCollection({});
        }
    }
}