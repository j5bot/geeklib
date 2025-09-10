import { ThingType } from '../types';

export type InfoFromLocation = {
    type: ThingType;
    id?: number;
    slug?: string;
    subPath?: string;
};

export const getInfoFromLocation = (): InfoFromLocation => {
    const url = new URL(window.location.href);
    const segments = url.pathname
        .split('/').slice(1);

    const type = segments[0] as InfoFromLocation['type'];
    const id = parseInt(segments[1], 10);
    const slug = segments[2];
    const subPath = segments.slice(3)?.join('/');

    return {
        type,
        id: isNaN(id) ? undefined : id,
        slug,
        subPath: subPath?.length > 0 ? subPath : undefined,
    };
};
