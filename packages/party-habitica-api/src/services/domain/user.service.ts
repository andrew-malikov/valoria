import { Options } from 'got/dist/source';
import UrlBuilder from 'rest-api-url-builder';

import { User } from '../../models/domain/user';
import { BaseHttpService } from './base.service';

import { ParticularHandle } from '../../infrastructure/chains';
import { get } from '../http.service';

import { HabiticaRoutes } from '../../routing/routes';

export interface UserService {
    getUser(): Promise<User>;
}

export class HttpUserService extends BaseHttpService implements UserService {
    constructor(urls: UrlBuilder, setupOptions: ParticularHandle<Options>) {
        super(urls, setupOptions);
    }

    getUser(): Promise<User> {
        return get<User>(this.urls.build(HabiticaRoutes.USER).get(), this.setupOptions);
    }
}
