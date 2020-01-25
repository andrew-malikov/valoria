/**
 * Represents Habitica habit
 *
 * @property originalId - ID related to Habitica Habit
 * @property wasDeleted - Indicate that the Habit was deleted from Habitica
 */
export interface Habit {
    readonly text: string;
    readonly notes: string;
    readonly priority: number;

    readonly value: number;

    readonly originalId: string;
    readonly wasDeleted: boolean;
}
