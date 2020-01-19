import { Option, none, some } from 'fp-ts/lib/Option';

import { AppAuth } from '../../models/auth/app-auth';

export function tryToCreateAppAuth(clientId: string, developerId: string): Option<AppAuth> {
    if (clientId.length === 0 || developerId.length === 0) {
        return none;
    }

    return some(new AppAuth(clientId, developerId));
}
