import { Option, none, some } from 'fp-ts/lib/Option';

import { UserAuth } from '../models/user-auth';

export function tryToCreateUserAuth(userId: string, token: string): Option<UserAuth> {
    if (userId.length === 0 || token.length === 0) {
        return none;
    }

    return some(new UserAuth(userId, token));
}
