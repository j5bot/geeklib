import Dexie, { EntityTable } from 'dexie';
import { AccountResponse } from '../account';
import { GeeklistResponse } from '../geeklist';
import { throttledFetch } from '../limiters';
import { UserResponse } from '../user';

export type CacheableResponse =
    | AccountResponse
    | GeeklistResponse
    | UserResponse;

export type CacheEntity = {
    url: string;
    response: CacheableResponse;
};

export const cacheDatabase = new Dexie('cache') as Dexie & {
    responses: EntityTable<CacheEntity, 'url'>;
};

cacheDatabase.version(1).stores({
    responses: 'url',
});

export const getResponseFromCache = async (url: string) =>
    (await cacheDatabase.responses.get(url))?.response;

export const addResponseToCache = async (url: string, cachedResponse: CacheableResponse) => {
    const previousResponse = await cacheDatabase.responses.get(url);
    if (previousResponse) {
        return cacheDatabase.responses.put({ url, response: cachedResponse });
    } else {
        return cacheDatabase.responses.add({ url, response: cachedResponse });
    }
};

export const deleteResponseFromCache = async (url: string) =>
    await cacheDatabase.responses.delete(url);

export const throttledFetchWithCacheResponse = async (
    info: RequestInfo | URL,
    init?: RequestInit
) => {
    const cachedResponse = await getResponseFromCache(info.toString());
    if (cachedResponse) {
        return cachedResponse;
    }
    const response = await throttledFetch(info, init)
        .then(response => response.json());

    try {
        await addResponseToCache(info.toString(), response);
    } catch (_e) {
        console.log('ignoring cache add failure');
    }

    return response;
};
