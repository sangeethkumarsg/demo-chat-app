export enum COLLECTION_ROOTS {
    USERS =  "users",
    CHAT =  "chat",
}

export enum SUB_COLLECTIONS{
    CHAT_CONTENTS = "chat-contents"
}

export interface UserDoc {
    uid: string;
    displayName: string;
    email: string;
    lastLoggedInTS: string;
}

export enum CHAT_STATUS{
    ACTIVE = 'Active',
    BLOCKED = 'Blocked'
}

export enum CHAT_TYPES{
    PRIVATE = "private",
    GROUP = "group"
}

export enum CHAT_MEDIA_TYPE {
    IMAGE = 'image',
    AUDIO = 'audio',
    VIDEO = 'video',
    UNKNOWN = 'unknown'
}