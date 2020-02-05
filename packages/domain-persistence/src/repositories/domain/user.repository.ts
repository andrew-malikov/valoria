import { Datastore } from '@google-cloud/datastore';

import { User, UserStaticKind } from '../../models/user';
import { get, save, remove, hasByKind } from '../base.repository';

export function getUserKind(name: string): string[] {
    return [UserStaticKind, name];
}

export interface UserRepository {
    getUser(userName: string): Promise<User>;
    hasUser(userName: string): Promise<boolean>;
    saveUser(user: { name: string; data: User }): Promise<User>;
    removeUser(userName: string): Promise<boolean>;
}

export class FirestoreUserRepository implements UserRepository {
    constructor(private readonly datastore: Datastore) {}

    public async getUser(userName: string): Promise<User> {
        return get<User>(getUserKind(userName), this.datastore);
    }

    public async hasUser(userName: string): Promise<boolean> {
        return hasByKind(getUserKind(userName), this.datastore);
    }

    public async saveUser(user: { name: string; data: User }): Promise<User> {
        return save<User>(getUserKind(user.name), user.data, this.datastore);
    }

    public async removeUser(userName: string): Promise<boolean> {
        return remove(getUserKind(userName), this.datastore);
    }
}
