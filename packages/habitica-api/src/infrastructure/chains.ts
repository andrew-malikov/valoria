import { Option, map, flatten } from 'fp-ts/lib/Option';

export type ParticularHandle<T> = (data: T) => Option<T>;

export function chain<T>(handle: ParticularHandle<T>, ...rest: ParticularHandle<T>[]): ParticularHandle<T> {
    return (data: T): Option<T> => {
        const processedResult = handle(data);

        if (rest.length === 0) {
            return processedResult;
        }

        const chained = map<T, Option<T>>(intermediate => {
            return chain(rest[0], ...rest.slice(1, rest.length))(intermediate);
        });

        return flatten(chained(processedResult));
    };
}
