import { Datastore } from '@google-cloud/datastore';

import { UserStaticKind } from '../models/user';
import { PasswordStaticKind, Password } from '../models/password';
import { get, save, remove } from './base.repository';

/**
 * @param {stirng} hash of the password
 */
export function getPasswordKind(userName: string, hash: string): string[] {
    return [UserStaticKind, userName, PasswordStaticKind, hash];
}

export function getPasswordsKind(userName: string): string[] {
    return [UserStaticKind, userName, PasswordStaticKind];
}

export async function getPassword(key: { userName: string; hash: string }, datastore: Datastore): Promise<Password> {
    return get<Password>(getPasswordKind(key.userName, key.hash), datastore);
}

export async function savePassword(
    password: { userName: string; hash: string; data: Password },
    datastore: Datastore,
): Promise<Password> {
    return save<Password>(getPasswordKind(password.userName, password.hash), password.data, datastore);
}

export async function removePassword(key: { userName: string; hash: string }, datastore: Datastore): Promise<boolean> {
    return remove(getPasswordKind(key.userName, key.hash), datastore);
}

export async function removeAllPasswords(userName: string, datastore: Datastore): Promise<boolean> {
    return remove(getPasswordsKind(userName), datastore);
}
