import { getAccount } from './account';
import * as account from './account';
import * as geeklist from './geeklist';
import { Geeklib } from './types';
import * as user from './user';

export type * from './types';

(window as any).geeklib = {
    ...account,
    ...geeklist,
    ...user,
} as Geeklib;

getAccount().then();
