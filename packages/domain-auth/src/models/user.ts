export interface EncryptedUser {
    readonly name: string;
    readonly password: string;
}

export interface DecryptedUser {
    readonly name: string;
    readonly password: string;
}
