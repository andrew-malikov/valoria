import { some, Option } from 'fp-ts/lib/Option';
import { Options } from 'got';

import { UserAuth } from '../models/auth/user-auth';
import { AppAuth } from '../models/auth/app-auth';

import { ParticularHandle } from '../infrastructure/chains';

export function applyUserAuth(auth: UserAuth): ParticularHandle<Options> {
    return (options: Options): Option<Options> =>
        some({
            ...options,
            headers: {
                ...options.headers,
                'x-api-user': auth.userId,
                'x-api-key': auth.token,
            },
        });
}

export function applyAppAuth(auth: AppAuth): ParticularHandle<Options> {
    return (options: Options): Option<Options> =>
        some({ ...options, headers: { ...options.headers, 'x-client': `${auth.developerId}-${auth.clientId}` } });
}

export function disableRetry(): ParticularHandle<Options> {
    return (options: Options): Option<Options> => some({ ...options, retry: 0 });
}
