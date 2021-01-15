export enum COLLECTION_ROOTS {
    USERS =  "users",
    CHAT =  "chat",
}

export interface UserDoc {
    uid: string;
    displayName: string;
    email: string;
    lastLoggedInTS: string;
}