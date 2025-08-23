let authToken: string;
export const setAuthToken = (newToken: string) =>
    authToken = newToken;

export const authenticatedFetch = async (url: string, init?: RequestInit)=> {
    const finalHeaders = Object.assign({}, init?.headers, {
        authentication: `GeekAuth ${authToken}`,
    });
    const finalInit = Object.assign({}, init, { headers: finalHeaders });
    return await fetch(url, finalInit);
};
