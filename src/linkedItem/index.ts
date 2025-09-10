import { apiHost } from '../constants';
import { addGeekItemSearchParams } from '../geekitem';
import { throttledFetch } from '../limiters';
import { LinkedItem, LinkedItemsParameters, LinkedItemsResponse } from './types';

const linkedItemsBaseUrl = `${apiHost}/api/geekitem/linkeditems`;

const addLinkedItemSearchParams = (
    parameters: LinkedItemsParameters,
    searchParams: URLSearchParams
) => {
    const {
        linkdata_index = 'boardgameversion',
        pageid = 1,
        showcount = 100,
        sort = 'yearpublished',
        subtype = linkdata_index,
    } = parameters;
    addGeekItemSearchParams(parameters, searchParams);

    linkdata_index && searchParams.append('linkdata_index', linkdata_index);
    searchParams.append('pageid', pageid.toString());
    searchParams.append('showcount', showcount.toString());
    searchParams.append('sort', sort);
    searchParams.append('subtype', subtype);
};

/**
 * Retrieve the array linked items of the given type/subtype.
 * Specify the page id and showcount items for large paginated sets.
 * Get the total number of items via the `config.numitems` property.
 * @param parameters
 */
export const getLinkedItems = async (
    parameters: LinkedItemsParameters
): Promise<LinkedItemsResponse> => {
    const url = new URL(linkedItemsBaseUrl);
    const { searchParams } = url;
    addLinkedItemSearchParams(parameters, searchParams);

    return await throttledFetch(url).then(response => response.json());
};

export const getAllLinkedItems = async (
    parameters: LinkedItemsParameters,
): Promise<LinkedItem[]> => {
    Object.assign(parameters, { pageid: 1 });

    const linkedItemResponse = await getLinkedItems(parameters);
    const { config } = linkedItemResponse;
    let { items } = linkedItemResponse;
    const pageCount = Math.ceil(
        config.numitems / (parameters.showcount ?? 100)
    );
    for (let i = 1; i < pageCount; i++) {
        const response = await getLinkedItems({
            ...parameters,
            pageid: i,
        });
        items = items.concat(response.items ?? []);
    }
    return items;
};
