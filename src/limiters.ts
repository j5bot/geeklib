import pLimit from 'p-limit';
import sleep from 'sleep-promise';
import { authenticatedFetch } from './api';
import { waitInterval } from './constants';

export const retryLimit = 15;

export const fetchLimiter = pLimit(1);
export const limitedFetch = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    return fetchLimiter(authenticatedFetch, input, init);
};
export const throttledFetch =
    async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        let depth = 0;
        return await limitedFetch(input, init).then(async response => {
            if (response.ok) {
                return response;
            }
            // rate limiter
            if (response.status === 429) {
                await sleep(2 ** depth * waitInterval);
                depth++;
                if (depth < retryLimit) {
                    return throttledFetch(input, init);
                }
                return response;
            }
            return response;
        })
    };
