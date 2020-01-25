import { Option, some, none } from 'fp-ts/lib/Option';
import { Datastore } from '@google-cloud/datastore';

export type GetKind = () => string[];

export async function get<T>(getKind: GetKind, datastore: Datastore): Promise<Option<T>> {
    const key = datastore.key(getKind());

    return datastore
        .get(key)
        .then(([entity]) => some(entity))
        .catch(() => none);
}

export async function save<T>(getKind: GetKind, data: T, datastore: Datastore): Promise<Option<T>> {
    const key = datastore.key(getKind());

    const requestToUpdate = {
        key,
        data: data,
    };

    return datastore
        .update(requestToUpdate)
        .then(() => some(data))
        .catch(() => none);
}

export async function remove(getKind: GetKind, datastore: Datastore): Promise<boolean> {
    const key = datastore.key(getKind());

    return datastore
        .delete(key)
        .then(() => true)
        .catch(() => false);
}
