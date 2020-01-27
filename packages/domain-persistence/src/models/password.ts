export interface Password {
    readonly client: string;
    readonly isActual: boolean;
}

export const PasswordStaticKind = 'password';
