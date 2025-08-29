let authToken: string;
export const setAuthToken = (newToken: string) =>
    authToken = newToken;

export const authenticatedFetch = async (info: RequestInfo | URL, init?: RequestInit)=> {
    const finalHeaders = Object.assign({}, init?.headers, {
        authentication: `GeekAuth ${authToken}`,
    });
    const finalInit = Object.assign({}, init, { headers: finalHeaders });
    return await fetch(info, finalInit);
};

export function apiInit(method?: string, body?: any, init?: Partial<RequestInit>) {
    return Object.assign({
        method: method ?? 'GET',
        body: body === undefined ? undefined :
              typeof body === 'string' ? body : JSON.stringify(body),
        headers: {
            'content-type': 'application/json',
        },
    }, init);
}

export const deleteInit = apiInit.bind(null, 'DELETE');
export const getInit = apiInit.bind(null, 'GET');
export const postInit = apiInit.bind(null, 'POST');
