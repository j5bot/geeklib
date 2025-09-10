import sleep from 'sleep-promise';
import { waitInterval } from '../constants';
import { throttledFetch } from '../limiters';

const maxRetries = 20;

export const xmlFetchAndWait = async (
    url: string,
    depth: number = 0,
    xml: boolean = true,
): Promise<Document> => {
    return throttledFetch(url)
        .then((response) => response.text())
        .then(text => getPageDOM(text, xml))
        .then(async (xml) => {
            if (xml.querySelector('error message')) {
                if (depth > maxRetries) {
                    throw Error(
                        `Failed to fetch ${url} after ${depth + 1} tries`,
                    );
                }
                await sleep(2 ** depth * waitInterval);
                return await xmlFetchAndWait(url, depth + 1);
            } else {
                return xml;
            }
        });
};

export const getElementAttribute = (
    element: Element | null,
    number?: boolean,
    attribute?: string
) =>
    (
        element && attribute
    ) ?
    number ?
    parseInt(element.getAttribute(attribute) ?? 'undefined', 10) :
    element.getAttribute(attribute) ?? undefined :
    undefined;

export const getElementInnerHTML = (
    element: Element | null,
    number?: boolean
) =>
    element ?
    number ?
    parseInt(element.innerHTML ?? 'undefined', 10) :
    element.innerHTML :
    undefined;

export const elementGetter = (
    element: Element | null,
    number?: boolean,
    selector?: string,
    attribute?: string,
    defaultValue?: string | number,
)  => {
    const resolvedElement = selector ? element?.querySelector(selector) ?? null : element;
    return resolvedElement ? attribute ?
                             getElementAttribute(resolvedElement, number, attribute) :
                             getElementAttribute(resolvedElement, number, 'value') ??
                             getElementInnerHTML(resolvedElement, number) :
           defaultValue;
};

const parser = new window.DOMParser();
export const getPageDOM = (domStr: string, xml = false) => {
    if (xml) {
        return parser.parseFromString(domStr, 'text/xml');
    }
    const frag = document.createDocumentFragment();
    const node = document.createElement('html');
    node.innerHTML = domStr;
    frag.appendChild(node);
    return frag as unknown as Document;
};
