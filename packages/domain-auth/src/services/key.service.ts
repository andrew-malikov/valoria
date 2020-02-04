import { generate } from 'generate-password';

import { Key } from '../models/key';

export function getKey(length: number): Key {
    return generate({ length: length });
}
