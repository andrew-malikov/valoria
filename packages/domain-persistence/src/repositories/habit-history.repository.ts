import { Datastore } from '@google-cloud/datastore';

import { HabitStaticKind } from '../models/habit';
import { HabitHistoryStaticKind, HabitHistory } from '../models/habit-history';
import { save, getMany, remove } from './base.repository';

/**
 * @param {string} habitId related to Habitica Habit
 */
export function getHabitHistoriesKind(habitId: string): string[] {
    return [HabitStaticKind, habitId, HabitHistoryStaticKind];
}

export interface HabitHistoryRepository {
    getAllHabitHistories(habitId: string): Promise<HabitHistory[]>;

    saveHabitHistory(history: { habitId: string; data: HabitHistory }): Promise<HabitHistory>;

    removeAllHabitHistory(habitId: string): Promise<boolean>;
}

export class FirestoreHabitHistoryRepository implements HabitHistoryRepository {
    constructor(private readonly datastore: Datastore) {}

    async getAllHabitHistories(habitId: string): Promise<HabitHistory[]> {
        return getMany<HabitHistory>(getHabitHistoriesKind(habitId), this.datastore);
    }

    async saveHabitHistory(history: { habitId: string; data: HabitHistory }): Promise<HabitHistory> {
        return save<HabitHistory>(getHabitHistoriesKind(history.habitId), history.data, this.datastore);
    }

    async removeAllHabitHistory(habitId: string): Promise<boolean> {
        return remove(getHabitHistoriesKind(habitId), this.datastore);
    }
}
