import { Login } from '../shared';

export const getUserToken = (services: {
    isValid: (login: Login) => boolean;
    getToken: (login: Login) => Promise<string>;
}) => (login: Login): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (!services.isValid(login)) {
            return reject(new Error('The login data is not valid'));
        }

        return resolve(
            services.getToken(login).catch(error => {
                // TODO: use a wrapper around error
                throw new Error("Can't generate a user token");
            }),
        );
    });
};
