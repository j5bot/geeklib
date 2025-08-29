import * as account from './account';
import * as geeklist from './geeklist';
export type * from './types/index';
import * as user from './user';

export type Geeklib =
    | typeof account
    | typeof geeklist
    | typeof user;
