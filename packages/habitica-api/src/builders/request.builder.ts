import { GotOptions } from 'got';

import { UserAuth } from '../models/user-auth';
import { ParticularHandle } from '../infrastructure/chains';
import { some, Option } from 'fp-ts/lib/Option';

export function applyAuthHeaders(auth: UserAuth): ParticularHandle<GotOptions> {
    return (options: GotOptions): Option<GotOptions> =>
        some({
            ...options,
            headers: {
                ...options.headers,
                'x-api-user': auth.userId,
                'x-api-key': auth.token,
            },
        });
}

export function applyClientId(clientId: string): ParticularHandle<GotOptions> {
    return (options: GotOptions): Option<GotOptions> =>
        some({ ...options, headers: { ...options.headers, 'x-client': clientId } });
}
