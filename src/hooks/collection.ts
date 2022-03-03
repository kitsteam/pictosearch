import { useEffect, useState } from "react";
import { initialPictogramState, PictogramState } from "../components/PictogramConfigurator/state";
import * as uuid from 'uuid';

const parseStorageItem = (key: string, value: string): CollectionItem | undefined => {
    const match = key.match(/^picto:(\d+):([-a-z0-9]+)/);

    if (!match) {
        return;
    }

    const [, stringId, version] = match;
    const id = parseInt(stringId, 10);
    const data = parseItem(value);

    if (data) {
        return { id, version, ...data };
    }
}

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

export type CollectionContent = {
    [key: string]: CollectionItem,
};

export type Collection = {
    content: CollectionContent,
    size: number,
    count: (id: number) => number,
    storeNew: (id: string | number, title?: string) => void,
    store: (id: string | number, version: string, state: PictogramState, title?: string) => void,
    delete: (id: string, version: string) => void,
    deleteAll: () => void,
}

export const useCollection = (): Collection => {
    const [collection, setCollection] = useState<CollectionContent>({});

    useEffect(() => {
        const collection: CollectionContent = {};

        for (const [key, value] of Object.entries(localStorage)) {
            const data = parseStorageItem(key, value);

            if (data) {
                collection[key] = data;
            }
        }

        setCollection(collection);
    }, []);

    const store = (id: string | number, version: string, state: PictogramState, title?: string) => {
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
                id: parseInt(id.toString(), 10),
                version,
                ...data,
            },
        });
    };

    return {
        content: collection,
        size: Object.keys(collection).length,
        count: (id: number) => Object.keys(collection).filter(key => key.startsWith(`picto:${id}:`)).length,
        storeNew: (id: string | number, title?: string) => {
            return store(id, uuid.v4(), initialPictogramState, title);
        },
        store,
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