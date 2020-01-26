/**
 * Represents Habitica habit
 *
 * @property {string} originalId related to Habitica Habit
 * @property {boolean} wasDeleted indicate that the Habit was deleted from Habitica
 */
export interface Habit {
    readonly text: string;
    readonly notes: string;
    readonly priority: number;

    readonly value: number;

    readonly originalId: string;
    readonly wasDeleted: boolean;
}

export const HabitStaticKind = 'habit';
