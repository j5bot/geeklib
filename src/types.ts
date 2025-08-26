import * as account from './account';
import * as user from './user';

export type Geeklib =
    | typeof account
    | typeof user;
