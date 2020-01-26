/**
 * @property {Date} occured, time when the action occurred
 * @property {number} value of the habit recorded during the time
 */
export interface HabitHistory {
    readonly occured: Date;
    readonly value: number;
}

export const HabitHistoryStaticKind = 'history';
