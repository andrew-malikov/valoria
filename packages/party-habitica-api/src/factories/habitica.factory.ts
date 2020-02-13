import { HabiticaService, HttpHabiticaService } from '../services/habitica.service';
import { UserAuth } from '../models/auth/user-auth';
import { AppAuth } from '../models/auth/app-auth';

export function getHabiticaService(baseUrl: string, auth: { user: UserAuth; app: AppAuth }): HabiticaService {
    return new HttpHabiticaService(baseUrl, { tasks: '/api/v3/tasks/user', user: '/api/v3/user' }, auth);
}
