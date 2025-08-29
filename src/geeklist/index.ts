import { flatten } from 'lodash';
import { postInit } from '../api';
import { apiHost } from '../constants';
import { throttledFetch } from '../limiters';
import { ImageSets, ItemDescriptor, Link, LinkedImage, Stats } from '../types';

const geeklistsAPI = `${apiHost}/api/geeklists`;
const geeklistItemsAPI = `${apiHost}/api/listitems`;

export type GeeklistPost = {
    body: string;
    commentsAllowed: boolean;
    domains: Array<'boardgame' | 'rpg' | 'videogame'>;
    name: string;
    ordinalDirection: 'ascending' | 'descending';
    private: boolean;
    publicAdditionsAllowed: boolean;
    sortType: 'average' | 'name' | 'rank' | 'user';
    stealth: boolean;
};

export type GeeklistPostResponse = {
    href: string;
    id: string;
    type: 'geeklists';
};

export type Geeklist = GeeklistPost & {
    bodyXml: string;
    canonical_link: string;
    creator: number;
    editdate?: string;
    href: string;
    id?: string;
    links: Link[];
    postdate: null | string;
    submitted: boolean;
    type: 'geeklists';
};

export type GeeklistItemItem = {
    breadcrumbs: unknown[];
    descriptors: ItemDescriptor[];
    hasAngularLink: boolean;
    href: string;
    id: string;
    imageSets: ImageSets;
    imageid: number;
    label: string;
    labelpl: string;
    name: string;
    nameSortIndex: number;
    type: 'things';
};

export type GeeklistItemPost = {
    body: string;
    imageOverridden: boolean;
    imageid: number;
    index: number;
    item: GeeklistItemItem;
    rollsEnabled: boolean;
};

export type GeeklistItem = GeeklistItemPost & {
    author: number;
    bodyXml: string;
    editdate: string;
    href: string;
    id?: string;
    linkedImages: LinkedImage[];
    links: Link[];
    listid: string;
    postdate: string;
    rollsCount: number;
    stats: Stats;
    type: 'listitems';
};

const makeGeeklistItemsAPIUrl = (listId: string, pageId: number): string => {
    const urlParams = new URLSearchParams();
    urlParams.set('listid', listId);
    urlParams.set('page', pageId.toString());

    return `${geeklistItemsAPI}?${urlParams.toString()}`;
};

export const getGeeklist = async (id: string): Promise<Geeklist> =>
    await throttledFetch(`${geeklistsAPI}/${id}`)
        .then(response => response.json());

const clearForNewGeeklist: Array<keyof Geeklist> = [
    'bodyXml',
    'canonical_link',
    'creator',
    'editdate',
    'href',
    'id',
    'links',
    'postdate',
    'submitted',
    'type',
];
export const toNewGeeklist = (geeklist: Geeklist) => {
    const newGeeklist = Object.assign({}, geeklist);
    clearForNewGeeklist.forEach(key => delete newGeeklist[key]);
    return newGeeklist;
};

export const getGeeklistItems = async (
    {id, page = 1, getAll = true, collectItem}:
    {id: string; page?: number; getAll?: boolean; collectItem?: boolean}
): Promise<GeeklistItem[] | Record<string, GeeklistItem>> => {
    const initialPage = await throttledFetch(makeGeeklistItemsAPIUrl(id, page)
    ).then(request => request.json());

    if (getAll) {
        const totalItems = initialPage.pagination.total;
        const perPage = initialPage.pagination.perPage;
        const currentPage = initialPage.pagination.pageid;

        const totalPages = Math.ceil(totalItems / perPage);
        const pageItems = [];

        for (let i = currentPage; i <= totalPages; i++) {
            pageItems.push(await getGeeklistItems({id, page: i, getAll: false, collectItem})
                .catch(() => getGeeklistItems({id, page: i, getAll: false, collectItem})
                    .catch(() => console.log(`can't get page on 2nd try`))));
        }
        // @ts-ignore fix later to make the typings work
        return collectItem ? Object.assign({}, ...pageItems) : flatten(pageItems);
    } else {
        return collectItem ? initialPage.data.reduce((
                acc: string[] | Record<number, GeeklistItemItem>,
                geeklistItem: GeeklistItem,
            ) => Object.assign(acc, {
                    [geeklistItem.item.id]: geeklistItem.item
                }), {})
                : initialPage.data;
    }
};

const clearForNewGeeklistItem: Array<keyof GeeklistItem> = [
    'author',
    'bodyXml',
    'editdate',
    'href',
    'id',
    'linkedImages',
    'links',
    'listid',
    'postdate',
    'rollsCount',
    'stats',
    'type',
];
export const toNewGeeklistItem = (geeklistItem: GeeklistItem) => {
    const newGeeklistItem = Object.assign({}, geeklistItem);
    clearForNewGeeklistItem.forEach(key => delete newGeeklistItem[key]);
    return newGeeklistItem;
};

export const createGeeklistItem = async (listId: string, geeklistItem: GeeklistItemPost) =>
    await throttledFetch(`${geeklistsAPI}/${listId}/listitems`, postInit(geeklistItem))
        .then(response => response.json());

export const createGeeklist = async (geeklist: GeeklistPost): Promise<GeeklistPostResponse> =>
    await throttledFetch(geeklistsAPI, postInit(geeklist))
        .then(response => response.json());

export type CopyGeeklistParameters = {
    copyItems: boolean;
    sourceId: string;
    targetId?: string;
};

export const copyGeeklist = async (params: CopyGeeklistParameters) => {
    const { copyItems = true, sourceId, targetId } = params;
    const sourceList = await getGeeklist(sourceId);

    if (!(copyItems || targetId)) {
        const newListResponse = await createGeeklist(toNewGeeklist(sourceList));
        return await getGeeklist(newListResponse.id);
    }

    const targetListId = targetId ?? (await createGeeklist(toNewGeeklist(sourceList))).id;
    const sourceListItems = await getGeeklistItems({ id: sourceId }) as GeeklistItem[];

    for (const item of sourceListItems) {
        await createGeeklistItem(targetListId, toNewGeeklistItem(item));
    }

    return await getGeeklist(targetListId);
};

// no duplicate detection!
export const combineGeeklists = async (targetId: string, ...sourceIds: string[]) => {
    if (!(targetId && sourceIds.length > 0)) {
        return undefined;
    }
    for (const sourceId of sourceIds) {
        await copyGeeklist({ copyItems: true, sourceId, targetId });
    }
    return await getGeeklist(targetId);
};
