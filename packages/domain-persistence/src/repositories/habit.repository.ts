import { Datastore } from '@google-cloud/datastore';

import { UserStaticKind } from '../models/user';
import { HabitStaticKind, Habit } from '../models/habit';
import { get, save, remove, getMany } from './base.repository';

/**
 * @param {string} habitId related to Habitica
 */
export function getHabitKind(userName: string, habitId: string): string[] {
    return [UserStaticKind, userName, HabitStaticKind, habitId];
}

export function getHabitsKind(userName: string): string[] {
    return [UserStaticKind, userName, HabitStaticKind];
}

export async function getHabit(key: { userName: string; habitId: string }, datastore: Datastore): Promise<Habit> {
    return get<Habit>(getHabitKind(key.userName, key.habitId), datastore);
}

export async function getAllHabits(userName: string, datastore: Datastore): Promise<Habit[]> {
    return getMany<Habit>(getHabitsKind(userName), datastore);
}

export async function saveHabit(
    habit: { userName: string; habitId: string; data: Habit },
    datastore: Datastore,
): Promise<Habit> {
    return save<Habit>(getHabitKind(habit.userName, habit.habitId), habit.data, datastore);
}

export async function removeHabit(key: { userName: string; habitId: string }, datastore: Datastore): Promise<boolean> {
    return remove(getHabitKind(key.userName, key.habitId), datastore);
}

export async function removeAllHabit(userName: string, datastore: Datastore): Promise<boolean> {
    return remove(getHabitsKind(userName), datastore);
}
