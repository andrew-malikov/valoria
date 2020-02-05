import { Datastore } from '@google-cloud/datastore';

import { UserStaticKind } from '../../models/user';
import { HabitStaticKind, Habit } from '../../models/habit';
import { get, save, remove, getMany } from '../base.repository';

/**
 * @param {string} habitId related to Habitica
 */
export function getHabitKind(userName: string, habitId: string): string[] {
    return [UserStaticKind, userName, HabitStaticKind, habitId];
}

export function getHabitsKind(userName: string): string[] {
    return [UserStaticKind, userName, HabitStaticKind];
}

export interface HabitRepository {
    getHabit(key: { userName: string; habitId: string }): Promise<Habit>;

    getAllHabits(userName: string): Promise<Habit[]>;

    saveHabit(habit: { userName: string; habitId: string; data: Habit }): Promise<Habit>;

    removeHabit(key: { userName: string; habitId: string }): Promise<boolean>;

    removeAllHabit(userName: string): Promise<boolean>;
}

export class FirestoreHabitRepository implements HabitRepository {
    constructor(private readonly datastore: Datastore) {}

    async getHabit(key: { userName: string; habitId: string }): Promise<Habit> {
        return get<Habit>(getHabitKind(key.userName, key.habitId), this.datastore);
    }

    async getAllHabits(userName: string): Promise<Habit[]> {
        return getMany<Habit>(getHabitsKind(userName), this.datastore);
    }

    async saveHabit(habit: { userName: string; habitId: string; data: Habit }): Promise<Habit> {
        return save<Habit>(getHabitKind(habit.userName, habit.habitId), habit.data, this.datastore);
    }

    async removeHabit(key: { userName: string; habitId: string }): Promise<boolean> {
        return remove(getHabitKind(key.userName, key.habitId), this.datastore);
    }

    async removeAllHabit(userName: string): Promise<boolean> {
        return remove(getHabitsKind(userName), this.datastore);
    }
}
