import { EncryptedUser, DecryptedUser } from '../models/user';

export type Encrypt = (data: string, salt: string) => string;
export type Decrypt = (data: string, salt: string) => string;

export function encryptUser(name: string, password: string): (encrypt: Encrypt, salt: string) => EncryptedUser {
    return (encrypt: Encrypt, salt: string): EncryptedUser => {
        return { name: encrypt(name, salt), password: encrypt(password, salt) };
    };
}

export function decryptUser(encrypted: EncryptedUser): (decrypt: Decrypt, salt: string) => DecryptedUser {
    return (decrypt: Decrypt, salt: string): EncryptedUser => {
        return { name: decrypt(encrypted.name, salt), password: decrypt(encrypted.password, salt) };
    };
}
