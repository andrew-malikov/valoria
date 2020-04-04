import { Failure } from './failure';

export interface NestedFailure extends Failure {
    nested?: NestedFailure;
}
