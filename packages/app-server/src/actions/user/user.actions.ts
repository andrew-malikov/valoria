type PersistUserDependencies = {
    hasUser: (username: string) => Promise<boolean>;
    saveUser: (username: string) => Promise<boolean>;
};

export const persistUser = ({ hasUser, saveUser }: PersistUserDependencies) => (username: string) => {
    return (
        hasUser(username)
            .then(isExist => {
                if (isExist) {
                    return;
                }

                return saveUser(username);
            })
            // TODO: use a downlevel error in the new error
            .catch(error => new Error("Can't persist the user"))
    );
};

export const removeUser = ({ removeUser }: { removeUser: (username) => Promise<boolean> }) => (username: string) => {
    return removeUser(username);
};
