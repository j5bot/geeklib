import { setAuthToken } from '../api';

export type AdBlockSetting =
    | 'blockleaderboard'
    | 'blockskyscraper'
    | 'blocktextad'
    | 'blockrectangle'
    | 'blockitembanner'
    | 'blockamazon'
    | 'blockamazonsearch'
    | 'blockbetweenposts';

export type AdBlockSettings = Record<AdBlockSetting, boolean>;

export type AccountUser = {
    user: number;
    username: string;
    email: string;
    emailVerified: boolean;
};

export type AccountAdBlock = {
    adblock: AdBlockSettings;
    adblockExpiration?: string;
};

export type AccountSocialIntegrations = {
    tweetplays: boolean;
    bskyplays: boolean;
};

export type AccountBling = {
    hasGeekbadge: boolean;
    hasSupergeekbadge: boolean;
    hasAvatar: boolean;
    hasAvatarOvertext: boolean;
    hasBadgeOvertext: boolean;
};

export type Account = {
    authToken: string;

    showdashboardicon: boolean;
    showlistcomments: boolean;
    wanteventnotify: boolean;

    notify_geekmail: boolean;
    ads_optin: boolean;
    hidden: false;
    admin: unknown[],
    betaTester: boolean;
}
    & AccountUser
    & AccountAdBlock
    & AccountSocialIntegrations
    & AccountBling;

export const getAccount = async (): Promise<Account> => {
    const account = await window.fetch('/api/accounts/current')
        .then(response => response.json()) as Account;
    setAuthToken(account.authToken);
    return account;
};
