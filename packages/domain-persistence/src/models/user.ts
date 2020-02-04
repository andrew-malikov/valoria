/**
 * @property {string} salt to encrypt user data
 */
export interface User {
    readonly profile: { name: string };
    readonly salt: string;
}

export const UserStaticKind = 'user';
