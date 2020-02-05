import { Datastore } from '@google-cloud/datastore';

import { UserRepository, FirestoreUserRepository } from './domain/user.repository';
import { HabitRepository, FirestoreHabitRepository } from './domain/habit.repository';
import { HabitHistoryRepository, FirestoreHabitHistoryRepository } from './domain/habit-history.repository';

export type DataContext = {
    readonly users: UserRepository;
    readonly habits: HabitRepository;
    readonly habitsHistories: HabitHistoryRepository;
};

export class FirestoreDataContext implements DataContext {
    public readonly users: UserRepository;
    public readonly habits: HabitRepository;
    public readonly habitsHistories: HabitHistoryRepository;

    constructor(datastore: Datastore) {
        this.users = new FirestoreUserRepository(datastore);
        this.habits = new FirestoreHabitRepository(datastore);
        this.habitsHistories = new FirestoreHabitHistoryRepository(datastore);
    }
}
