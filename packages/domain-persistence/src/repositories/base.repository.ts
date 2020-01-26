import { Option, some, none } from 'fp-ts/lib/Option';
import { Datastore } from '@google-cloud/datastore';

export type Kind = string[];
export type Kinds = Kind[];

export async function get<T>(kind: Kind, datastore: Datastore): Promise<Option<T>> {
    const key = datastore.key(kind);

    return datastore
        .get(key)
        .then(([entity]) => some(entity))
        .catch(() => none);
}

export async function getMany<T>(kind: Kind, datastore: Datastore): Promise<Option<T[]>> {
    const key = datastore.key(kind);

    return datastore
        .get(key)
        .then(entities => some(entities))
        .catch(() => none);
}

export async function save<T>(kind: Kind, data: T, datastore: Datastore): Promise<Option<T>> {
    const key = datastore.key(kind);

    const requestToSave = {
        key,
        data: data,
    };

    return datastore
        .upsert(requestToSave)
        .then(() => some(data))
        .catch(() => none);
}

export async function saveMany<T>(entities: Array<{ kind: Kind; data: T }>, datastore: Datastore): Promise<boolean> {
    const requestToSave = entities.map(entity => {
        return {
            key: datastore.key(entity.kind),
            data: entity.data,
        };
    });

    return datastore
        .upsert(requestToSave)
        .then(() => true)
        .catch(() => false);
}

export async function remove(kind: Kind, datastore: Datastore): Promise<boolean> {
    const key = datastore.key(kind);

    return datastore
        .delete(key)
        .then(() => true)
        .catch(() => false);
}

export async function removeMany(kinds: Kinds, datastore: Datastore): Promise<boolean> {
    const keys = kinds.map(kind => datastore.key(kind));

    return datastore
        .delete(keys)
        .then(() => true)
        .catch(() => false);
}
