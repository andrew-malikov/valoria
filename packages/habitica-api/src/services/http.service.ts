import { Option, none, isNone, map, getOrElse, some } from 'fp-ts/lib/Option';
import got, { Options } from 'got';

import { ParticularHandle } from '../infrastructure/chains';
import { RawResponse } from '../models/raw-response';

export async function get<T>(url: string, setupOptions: ParticularHandle<Options>): Promise<Option<T>> {
    const maybeOptions = setupOptions({});

    if (isNone(maybeOptions)) {
        return none;
    }

    const maybeResponse = map<Options, Promise<Option<T>>>(options =>
        got<RawResponse<T>>(url, {
            ...options,
            method: 'GET',
            isStream: false,
            resolveBodyOnly: false,
            responseType: 'json',
        }).then(response => {
            if (!response.body.success) {
                return none;
            }

            return some(response.body.data);
        }),
    )(maybeOptions);

    return getOrElse(() => new Promise((resolve, reject) => reject()) as Promise<Option<T>>)(maybeResponse);
}
