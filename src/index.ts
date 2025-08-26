import * as account from './account';
import { Geeklib } from './types';
import * as user from './user';

export type * from './types';

(window as any).geeklib = {
    ...account,
    ...user,
} as Geeklib;
