import { Failure } from './failure';
import { NestedFailure } from './nested-failure';

export function GetFailureWithError(error: Error, message: string): Failure {
    return { error, message };
}

export function GetNestedFailure(nested: NestedFailure, message: string): NestedFailure {
    return { nested, message };
}
