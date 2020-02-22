import { Merge } from 'type-fest';

import { ExtendableContext } from 'koa';

type Login = {
    username: string;
    password: string;
};

type Services = {
    isValid: (login: Login) => boolean;
    getToken: (login: Login) => Promise<string>;
    addUser: (login: Login) => Promise<boolean>;
};

type RequestBody = {
    body: Login;
};

export const getUserTokenAction = (services: Services) => (context: Merge<ExtendableContext, RequestBody>): void => {
    if (!services.isValid(context.body)) {
        return context.throw(400, 'The login data is not valid');
    }

    services
        .getToken(context.body)
        .then(async token => {
            await services.addUser(context.body);

            context.response.body = JSON.stringify({ token });
        })
        .catch(() => context.throw(400, "Can't generate a user token"));
};
