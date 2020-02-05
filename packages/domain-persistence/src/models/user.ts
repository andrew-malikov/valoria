/**
 * @property {string} key to encrypt user data
 */
export interface User {
    readonly profile: { name: string };
    readonly key: string;
}

export const UserStaticKind = 'user';
