export class AppAuth {
    /**
     * @param clientId an application name
     * @param developerId a UserId in Habitica
     */
    constructor(readonly clientId: string, readonly developerId: string) {}
}
