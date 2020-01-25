/**
 * @property hash - Hash of the password
 */
export interface Password {
    readonly hash: string;
}

export const PasswordStaticKind = 'password';
