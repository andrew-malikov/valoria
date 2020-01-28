import { Datastore, Query } from '@google-cloud/datastore';
import { entity } from '@google-cloud/datastore/build/src/entity';
import { RunQueryOptions } from '@google-cloud/datastore/build/src/query';

export type Kind = string[];
export type Kinds = Kind[];

export function getKey(kind: Kind, datastore: Datastore): entity.Key {
    return datastore.key(kind);
}

export async function get<T>(kind: Kind, datastore: Datastore): Promise<T> {
    const key = datastore.key(kind);

    return new Promise((resolve, reject) =>
        datastore.get(key).then(([entity]) => (entity ? resolve(entity) : reject('Nothing found by the kind'))),
    );
}

export async function getMany<T>(kind: Kind, datastore: Datastore): Promise<T[]> {
    const key = datastore.key(kind);

    return datastore.get(key).then(entities => entities);
}

export type ReadyQuery<T> = (kind: Kind, datastore: Datastore, queryOptions: RunQueryOptions) => Promise<T>;

/**
 * Reject a promise if a lot or nothing is found
 */
export function select<T>(setupQuery: (query) => Query): ReadyQuery<T> {
    return (kind: Kind, datastore: Datastore, queryOptions: RunQueryOptions = {}): Promise<T> => {
        const query = setupQuery(datastore.createQuery(kind));

        return new Promise((resolve, reject) => {
            datastore.runQuery(query, queryOptions).then(([response]) => {
                if (response.length === 0) {
                    return reject('Nothing found by the query');
                }

                if (response.length > 1) {
                    return reject('Found a lot of items by the query');
                }

                resolve(response[0]);
            });
        });
    };
}

export function selectMany<T>(setupQuery: (query) => Query): ReadyQuery<T[]> {
    return (kind: Kind, datastore: Datastore, queryOptions: RunQueryOptions = {}): Promise<T[]> => {
        const query = setupQuery(datastore.createQuery(kind));

        return datastore.runQuery(query, queryOptions).then(([response]) => {
            return response;
        });
    };
}

export async function save<T>(kind: Kind, data: T, datastore: Datastore): Promise<T> {
    const key = datastore.key(kind);

    const requestToSave = {
        key,
        data: data,
    };

    return datastore.upsert(requestToSave).then(() => data);
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
