import { fold, Either } from 'fp-ts/lib/Either';

import { Login } from '../shared';

type PersistUserDependencies = {
    getLoginFromToken: (token: string) => Either<Error, Login>;
    hasUser: (username: string) => Promise<boolean>;
    saveUser: (username: string) => Promise<boolean>;
};

export const persistUser = ({ getLoginFromToken, hasUser, saveUser }: PersistUserDependencies) => (token: string) => {
    return new Promise((resolve, reject) => {
        fold(
            // TODO: use downlevel errors in new errors
            error => reject(new Error('Token is not valid')),
            ({ username }: Login) =>
                resolve(
                    hasUser(username)
                        .then(isExist => {
                            if (isExist) {
                                return;
                            }

                            return saveUser(username);
                        })
                        .catch(error => new Error("Can't persist the user")),
                ),
        )(getLoginFromToken(token));
    });
};
