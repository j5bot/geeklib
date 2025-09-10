import * as account from './account';
import * as geekitem from './geekitem';
import * as geeklist from './geeklist';
export type * from './types/index';
import * as user from './user';
import * as utils from './utils';

export type GeeklibSettings = {
    settings: {
        useCache: boolean;
    };
};

export type GeeklibUtils = {
    utils: typeof utils;
};

export type Geeklib =
    & GeeklibUtils
    & GeeklibSettings
    & typeof account
    & typeof geekitem
    & typeof geeklist
    & typeof user;
