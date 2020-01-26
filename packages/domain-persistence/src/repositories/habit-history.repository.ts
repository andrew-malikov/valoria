import { Option } from 'fp-ts/lib/Option';
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

export async function getAllHabitHistories(habitId: string, datastore: Datastore): Promise<Option<HabitHistory[]>> {
    return getMany<HabitHistory>(getHabitHistoriesKind(habitId), datastore);
}

export async function saveHabitHistory(
    history: { habitId: string; data: HabitHistory },
    datastore: Datastore,
): Promise<Option<HabitHistory>> {
    return save<HabitHistory>(getHabitHistoriesKind(history.habitId), history.data, datastore);
}

export async function removeAllHabitHistory(habitId: string, datastore: Datastore): Promise<boolean> {
    return remove(getHabitHistoriesKind(habitId), datastore);
}
