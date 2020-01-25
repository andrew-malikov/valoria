import { Option } from 'fp-ts/lib/Option';
import { Datastore } from '@google-cloud/datastore';

import { User, UserStaticKind } from '../models/user';
import { get, save, remove } from './base.repository';

export function getUserKind(name): string[] {
    return [UserStaticKind, name];
}

export async function getUser(userName: string, datastore: Datastore): Promise<Option<User>> {
    return get<User>(() => getUserKind(userName), datastore);
}

export async function saveUser(user: { name: string; data: User }, datastore: Datastore): Promise<Option<User>> {
    return save<User>(() => getUserKind(user.name), user.data, datastore);
}

export async function removeUser(userName: string, datastore: Datastore): Promise<boolean> {
    return remove(() => getUserKind(userName), datastore);
}
