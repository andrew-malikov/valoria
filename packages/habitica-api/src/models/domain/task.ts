export type Task = {
    id: string;
    userId: string;
    text: string;
    alias: string;
    type: string;
    notes: string;
    tags: [];
    value: number;
    priority: number;
    attribute: string;
    challenge?: {
        taskId: string;
        id: string;
    };
    group?: {
        assignedUsers: [];
        approval: {
            required: boolean;
            approved: boolean;
            requested: boolean;
        };
    };
    reminders: [];
    createdAt: string;
    updatedAt: string;
    history: Array<{ value: number; date: number }>;
    down: boolean;
    up: boolean;
};
