import { setAuthToken } from '../api';

/**
 * @module account
 */

/**
 * BGG Accounts API adblock setting names.
 * Each key can be present in {@link AdBlockSettings}
 * as a boolean indicating whether that type of ad is
 * blocked by a user/account
 */
export type AdBlockSetting =
    | 'blockleaderboard'
    | 'blockskyscraper'
    | 'blocktextad'
    | 'blockrectangle'
    | 'blockitembanner'
    | 'blockamazon'
    | 'blockamazonsearch'
    | 'blockbetweenposts';

/**
 * A dictionary of ad block settings and whether
 * the particular type of ad is blocked for the Account
 */
export type AdBlockSettings = Record<AdBlockSetting, boolean>;

/**
 * User fields that are part of the larger Accounts API
 */
export type AccountUser = {
    /**
     * The Users API id / user numeric id
     */
    user: number;
    /**
     * The displayed username for the user
     */
    username: string;
    /**
     * The user's registered email address (private)
     */
    email: string;
    /**
     * Whether or not the user's email address
     * has been verified
     */
    emailVerified: boolean;
};

/**
 * Ad block portion of Account type
 */
export type AccountAdBlock = {
    /**
     * The settings for individual ad block types
     */
    adblock: AdBlockSettings;
    /**
     * The date that a user's ad block privilege expires
     */
    adblockExpiration?: string;
};

/**
 * Social integrations portion of an Account
 */
export type AccountSocialIntegrations = {
    tweetplays: boolean;
    bskyplays: boolean;
};

/**
 * Various settings for whether an Account has 'bling'
 * such as an avatar and badges
 */
export type AccountBling = {
    hasGeekbadge: boolean;
    hasSupergeekbadge: boolean;
    hasAvatar: boolean;
    hasAvatarOvertext: boolean;
    hasBadgeOvertext: boolean;
};

/**
 * Additional non-categorized properties of an Account
 */
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

/**
 * Defines the response type of the Accounts API
 */
export type AccountResponse = Account;

/**
 * Gets the current user's Account and sets the API
 * authentication token
 * @return {Promise<Account>}
 */
export const getCurrentAccount = async (): Promise<Account> => {
    const account = await window.fetch('/api/accounts/current')
        .then(response => response.json()) as Account;
    setAuthToken(account.authToken);
    return account;
};
