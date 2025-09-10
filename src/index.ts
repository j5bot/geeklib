import { getCurrentAccount } from './account';
import * as account from './account';
import * as geekitem from './geekitem';
import * as geeklist from './geeklist';
import { Geeklib } from './types';
import * as user from './user';
import * as utils from './utils';

export type * from './types';

(window as any).geeklib = {
    ...account,
    ...geekitem,
    ...geeklist,
    ...user,
    settings: {
        useCache: true,
    },
    utils,
} as Geeklib;

getCurrentAccount().then();
