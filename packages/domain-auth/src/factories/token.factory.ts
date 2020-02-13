import { Either, tryCatch } from 'fp-ts/lib/Either';
import { JSONWebKey, JWE } from 'jose';

import { User } from '../models/user';

export function getJWE(user: User, key: JSONWebKey): Either<Error, string> {
    return tryCatch(
        () => JWE.encrypt(JSON.stringify(user), key),
        reason => new Error(reason as string),
    );
}

export function getJWEPayload(token: string, key: JSONWebKey): Either<Error, User> {
    return tryCatch(
        () => JSON.parse(JWE.decrypt(token, key, { complete: true }).cleartext.toString()),
        reason => new Error(reason as string),
    );
}
