import UrlBuilder from 'rest-api-url-builder';

import { TasksService, HttpTasksService } from './domain/tasks.service';
import { UserAuth } from '../models/auth/user-auth';
import { AppAuth } from '../models/auth/app-auth';

import { applyUserAuth, applyAppAuth, disableRetry } from '../builders/request.builder';

import { chain } from '../infrastructure/chains';
import { HabiticaRoutes } from '../routing/routes';

export interface HabiticaService {
    readonly tasks: TasksService;
}

export class HttpHabiticaService implements HabiticaService {
    readonly tasks: TasksService;

    constructor(baseUrl: string, routes: { [key in HabiticaRoutes]: string }, auth: { user: UserAuth; app: AppAuth }) {
        const urls = new UrlBuilder(routes, { baseUrl });
        const setupHttpOptions = chain(applyUserAuth(auth.user), applyAppAuth(auth.app), disableRetry());

        this.tasks = new HttpTasksService(urls, setupHttpOptions);
    }
}
