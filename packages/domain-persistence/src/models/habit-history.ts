/**
 * @property occured - Time when the action occurred
 * @property value - The value of the habit recorded during the time
 */
export interface HabitHistory {
    readonly occured: Date;
    readonly value: number;
}
