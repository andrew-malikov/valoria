export interface Password {
    readonly device: string;
    readonly isActual: boolean;
}

export const PasswordStaticKind = 'password';
