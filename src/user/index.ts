import { throttledFetch } from '../limiters';

const userApiBaseUrl = 'https://boardgamegeek.com/api/users/';

export type UserMicroBadge = {
    slot: number;
    badgeid: number;
};

export type Link = {
    rel: 'self';
    uri: `\/api\/users\/${number}`;
};

export type OverText = {
    avatar?: string;
};

export type Flag = {
    src: string;
    url: string;
};

export type UserAvatar = {
    urls: Record<
        'mds' | 'mds@2x' | 'md' | 'md@2x' | 'sm' | 'sm@2x' | 'default',
        string
    >;
    height: number;
    width: number;
};

export type UserBadgeUrls = Record<
    'default' | 'default@2x' | 'default@3x',
    string
>;

export type User = {
    type: 'users';
    id: string;
    userid: number;
    username: string;
    href: `\/user\/${string}`;
    firstname: string;
    lastname: string;
    city?: string;
    state?: string;
    country?: string;
    isocountry?: string;
    regdate: string;
    designerid: number;
    publisherid: number;
    hideSupporter: boolean;
    adminBadges: unknown[];
    userMicrobadges: UserMicroBadge[];
    supportYears: string[];
    hideName: boolean;
    links: Link[];
    canonical_link: string;
    overtext?: OverText;
    flag?: Flag;
    avatar?: UserAvatar;
    badgeUrls?: UserBadgeUrls;
};

export const getUser = async (id: number): Promise<User> => {
    return await throttledFetch(`${userApiBaseUrl}${id}`)
        .then(response => response.json());
};
