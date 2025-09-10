import { apiHost } from '../constants';
import { throttledFetch } from '../limiters';
import {
    AccessoryItem,
    ArtistItem,
    BoardGameItem,
    CategoryItem,
    CompilationItem,
    DesignerItem,
    DynamicInfo,
    ExpansionItem,
    FamilyItem,
    GeekItem,
    GeekItemBase,
    GeekItemFunctionParameters,
    MechanicItem,
    PublisherItem,
    VersionItem,
    VideoGameAdaptationItem
} from './types';

const geekItemBaseUrl = `${apiHost}/api/geekitem`;
const dynamicInfoBaseUrl = `${apiHost}/api/dynamicinfo`;

export const addGeekItemSearchParams = (
    parameters: GeekItemFunctionParameters,
    searchParams: URLSearchParams
) => {
    const {
        objectid, objecttype = 'thing', subtype = 'boardgame', type = 'things'
    } = parameters;

    searchParams.append('objectid', objectid.toString());
    searchParams.append('objecttype', objecttype);
    searchParams.append('subtype', subtype);
    searchParams.append('type', type);
};

export const getDynamicInfo = async (
    parameters: GeekItemFunctionParameters
): Promise<DynamicInfo> => {
    const url = new URL(dynamicInfoBaseUrl);
    const { searchParams } = url;
    addGeekItemSearchParams(parameters, searchParams);

    return throttledFetch(url).then(response => response.json())
        .then(response => response.item);
};

export const getGeekItem = async <T extends GeekItemBase = GeekItem>(
    parameters: GeekItemFunctionParameters
): Promise<T> => {
    const url = new URL(geekItemBaseUrl);
    const { searchParams } = url;
    addGeekItemSearchParams(parameters, searchParams);

    return throttledFetch(url).then(response => response.json())
        .then(response => response.item);
};

export const getAccessoryItem = async (
    parameters: Partial<GeekItemFunctionParameters>
): Promise<AccessoryItem> => {
    const extendedParameters = {
        ...parameters,
        objecttype: 'thing',
        subtype: 'boardgameaccessory',
        type: 'things',
    };

    return await getGeekItem<AccessoryItem>(extendedParameters as GeekItemFunctionParameters);
};

export const getArtistItem = async (
    parameters: Partial<GeekItemFunctionParameters>
): Promise<ArtistItem> => {
    const extendedParameters = {
        ...parameters,
        objecttype: 'person',
        subtype: 'boardgameartist',
        type: 'people',
    };

    return await getGeekItem<ArtistItem>(extendedParameters as GeekItemFunctionParameters);
};

export const getBoardGameItem = async (
    parameters: Partial<GeekItemFunctionParameters>
): Promise<BoardGameItem> => {
    const extendedParameters = {
        ...parameters,
        objecttype: 'thing',
        subtype: 'boardgame',
        type: 'things',
    };

    return await getGeekItem<BoardGameItem>(extendedParameters as GeekItemFunctionParameters);
};

export const getCategoryItem = async (
    parameters: Partial<GeekItemFunctionParameters>
): Promise<CategoryItem> => {
    const extendedParameters = {
        ...parameters,
        objecttype: 'property',
        subtype: 'boardgamecategory',
        type: 'properties',
    };

    return await getGeekItem<CategoryItem>(extendedParameters as GeekItemFunctionParameters);
};

export const getCompilationItem = async (
    parameters: Partial<GeekItemFunctionParameters>
): Promise<CompilationItem> => {
    const extendedParameters = {
        ...parameters,
        objecttype: 'thing',
        subtype: 'boardgamecompilation',
        type: 'things',
    };

    return await getGeekItem<CompilationItem>(extendedParameters as GeekItemFunctionParameters);
};

export const getDesignerItem = async (
    parameters: Partial<GeekItemFunctionParameters>
): Promise<DesignerItem> => {
    const extendedParameters = {
        ...parameters,
        objecttype: 'person',
        subtype: 'boardgameartist',
        type: 'people',
    };

    return await getGeekItem<DesignerItem>(extendedParameters as GeekItemFunctionParameters);
};

export const getExpansionItem = async (
    parameters: Partial<GeekItemFunctionParameters>
): Promise<ExpansionItem> => {
    const extendedParameters = {
        ...parameters,
        objecttype: 'thing',
        subtype: 'boardgamecompilation',
        type: 'things',
    };

    return await getGeekItem<ExpansionItem>(extendedParameters as GeekItemFunctionParameters);
};

export const getFamilyItem = async (
    parameters: Partial<GeekItemFunctionParameters>
): Promise<FamilyItem> => {
    const extendedParameters = {
        ...parameters,
        objecttype: 'property',
        subtype: 'boardgamefamily',
        type: 'properties',
    };

    return await getGeekItem<FamilyItem>(extendedParameters as GeekItemFunctionParameters);
};

export const getMechanicItem = async (
    parameters: Partial<GeekItemFunctionParameters>
): Promise<MechanicItem> => {
    const extendedParameters = {
        ...parameters,
        objecttype: 'property',
        subtype: 'boardgamemechanic',
        type: 'properties',
    };

    return await getGeekItem<MechanicItem>(extendedParameters as GeekItemFunctionParameters);
};

export const getPublisherItem = async (
    parameters: Partial<GeekItemFunctionParameters>
): Promise<PublisherItem> => {
    const extendedParameters = {
        ...parameters,
        objecttype: 'company',
        subtype: 'boardgamepublisher',
        type: 'companies',
    };

    return await getGeekItem<PublisherItem>(extendedParameters as GeekItemFunctionParameters);
};

export const getVersionItem = async (
    parameters: Partial<GeekItemFunctionParameters>
): Promise<VersionItem> => {
    const extendedParameters = {
        ...parameters,
        objecttype: 'version',
        subtype: 'boardgameversion',
        type: 'versions',
    };

    return await getGeekItem<VersionItem>(extendedParameters as GeekItemFunctionParameters);
};

export const getVideoGameAdaptationItem = async (
    parameters: Partial<GeekItemFunctionParameters>
): Promise<VideoGameAdaptationItem> => {
    const extendedParameters = {
        ...parameters,
        objecttype: 'thing',
        subtype: 'videogame',
        type: 'things',
    };

    return await getGeekItem<VideoGameAdaptationItem>(extendedParameters as GeekItemFunctionParameters);
};
