import { fold } from 'fp-ts/lib/Either';
import { JSONWebKey } from 'jose';

import { HabiticaService } from '@party/habitica-api';

import { User } from '../models/user';
import { getJWE } from '../factories/token.factory';

export interface LoginService {
    getToken(user: User): Promise<string>;
}

export type ProvidableKey = () => JSONWebKey;

export class HabiticaLoginService implements LoginService {
    constructor(private readonly getKey: ProvidableKey, private readonly habitica: HabiticaService) {}

    async getToken(user: User): Promise<string> {
        return new Promise((resolve, reject) => {
            this.habitica.users
                .getUser()
                .then(() => {
                    fold(
                        error => reject(error),
                        (token: string) => resolve(token),
                    )(getJWE(user, this.getKey()));
                })
                .catch(error => reject(error));
        });
    }
}
