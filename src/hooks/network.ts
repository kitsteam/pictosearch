import { useMemo } from "react";
import useSWR from 'swr';
import { Resolution } from "../components/PictogramConfigurator/state";
import { HairColor, SkinColor } from "../data/colors";

export const apiBaseUrl = process.env.REACT_APP_API || 'https://api.arasaac.org/api';
export const apiIdentifierBaseUrl = process.env.REACT_APP_API_IMAGES || 'https://static.arasaac.org/images';

console.log(apiBaseUrl)

const fetcher = (...args: any[]) => fetch(args[0], args[1]).then(res => res.json());

const limit = 100;

const passiveOptions = {
    revalidateOnFocus: false,
    dedupingInterval: 10000,
}

export type IPictogramResponse = {
    schematic: boolean,
    sex: boolean,
    violence: boolean,
    aac: boolean,
    aacColor: boolean,
    skin: boolean,
    hair: boolean,
    downloads: number,
    categories: string[],
    synsets: string[],
    tags: string[],
    _id: number,
    keywords: {
        keyword: string,
        type: number,
        plural: string,
        hasLocution: boolean
    }[],
    created: Date,
    lastUpdated: Date,
}

export function usePictogram(language: string, id: number): { error: any, isLoading: boolean, data?: IPictogramResponse } {
    const { data, error } = useSWR<IPictogramResponse>(`${apiBaseUrl}/pictograms/${language}/${id}`, fetcher, passiveOptions);

    return {
        error,
        isLoading: !data,
        data: data ? {
            ...data,
            created: new Date(data.created),
            lastUpdated: new Date(data.lastUpdated),
        } : data,
    }
}

type IPictogramNewResponse = {
    aac: boolean,
    aacColor: boolean,
    categories: string[],
    downloads: number,
    hair: boolean,
    keywords: string[],
    schematic: boolean,
    sex: boolean,
    skin: boolean,
    synsets: string[],
    tags: string[],
    violence: boolean,
    _id: number,
}[];

export function useNewPictograms(language: string): { error: any, isLoading: boolean, data?: IPictogramNewResponse } {
    const { data, error } = useSWR<IPictogramNewResponse>(`${apiBaseUrl}/pictograms/${language}/new/${limit}`, fetcher, passiveOptions);

    return {
        error,
        isLoading: !data,
        data,
    }
}

type IKeywordResponse = {
    code: string,
    language: string,
    words: string[],
    _id: string,
}

export function useKeywords(language: string): { error: any, isLoading: boolean, data: string[] } {
    const { data, error } = useSWR<IKeywordResponse>(`${apiBaseUrl}/keywords/${language}`, fetcher, passiveOptions);

    return {
        error,
        isLoading: !data,
        data: data ? data.words : [],
    }
}

type ISearchResultResponse = {
    _id: number,
    tags: string[],
    synsets: string[],
    sex: boolean,
    schematic: boolean,
    keywords: {
        type: number,
        meaning: string,
        plural: string,
        keyword: string,
        hasLocation: boolean,
    }[],
    desc: string,
    categories: string[],
    violence: boolean,
    hair: false,
    skin: false,
    aac: false,
    aacColor: false,
    score: number,
}[]

export function useSearch(language: string, query: string): { error: any, isLoading: boolean, data?: ISearchResultResponse } {
    const { data, error } = useSWR<ISearchResultResponse>(query ? `${apiBaseUrl}/pictograms/${language}/search/${encodeURIComponent(query)}` : null, fetcher, passiveOptions);

    return {
        error,
        isLoading: !data,
        data,
    }
}

export function getPictogramUrl(pictogramId: number, colorized: boolean, resolution: Resolution, skinColor: SkinColor, hairColor: HairColor): URL {
    const baseUrl = /^https?:\/\//.test(apiBaseUrl) ? apiBaseUrl : (window.location.origin + apiBaseUrl);
    const url = new URL(`${baseUrl}/pictograms/${pictogramId}`);
    url.searchParams.append('download', 'false');
    url.searchParams.append('color', colorized.toString());
    url.searchParams.append('resolution', resolution.toString());
    url.searchParams.append('skin', SkinColor[skinColor]);
    url.searchParams.append('hair', HairColor[hairColor]);

    return url;
}

export function usePictogramUrl(pictogramId: number, colorized: boolean, resolution: Resolution, skinColor: SkinColor, hairColor: HairColor): URL {
    const url = useMemo(() => {
        return getPictogramUrl(pictogramId, colorized, resolution, skinColor, hairColor);
    }, [pictogramId, colorized, resolution, skinColor, hairColor]);

    return url;
}