import { Option } from 'fp-ts/lib/Option';
import { Options } from 'got/dist/source';
import UrlBuilder from 'rest-api-url-builder';

import { Task } from '../../models/domain/task';
import { BaseHttpService } from './base.service';

import { ParticularHandle } from '../../infrastructure/chains';
import { get } from '../http.service';

import { HabiticaRoutes } from '../../routing/routes';

export interface TasksService {
    getTasks(): Promise<Option<Task[]>>;
}

export class HttpTasksService extends BaseHttpService implements TasksService {
    constructor(urls: UrlBuilder, setupOptions: ParticularHandle<Options>) {
        super(urls, setupOptions);
    }

    getTasks(): Promise<Option<Task[]>> {
        return get<Task[]>(this.urls.build(HabiticaRoutes.TASKS).get(), this.setupOptions);
    }
}
