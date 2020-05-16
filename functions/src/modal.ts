export class User {
    id: String;
    nickname: String;
    social: String;
    profileURL: String;
    receivedCount: Number;
    sentCount: Number;

    constructor(json: any) {
        this.id = json.id;
        this.nickname = json.nickname;
        this.social = json.social;
        this.profileURL = json.profileURL;
        this.receivedCount = json.receivedCount;
        this.sentCount = json.sentCount;
    }

    /**
     * name
     */
    public toString(): String {
        return `id: ${this.id}\n
        nickanme: ${this.nickname}\n
        social: ${this.social}\n
        profile_url: ${this.profileURL}\n
        received_count: ${this.receivedCount}\n
        sent_count: ${this.sentCount}`;
    }
}

export class Letter {
    id: String;
    from: User;
    to: Friend;
    location: Location;
    photo: String;
    message: String;
    createdAt: String;
    isRead: Boolean = false;

    constructor(json: any) {
        this.id = json.id;
        this.from = json.from;
        this.to = json.to;
        this.location = json.location;
        this.photo = json.photo;
        this.message = json.message;
        this.createdAt = json.createdAt;
        this.isRead = json.isRead;
    }
}

export class Friend {
    id: String;
    nickname: String;
    social: String;
    profileURL: String;
    requestState: State;
    createdAt: String;
    receivedCount: Number = 0
    sentCount: Number = 0

    constructor(json: any) {
        this.id = json.id;
        this.nickname = json.nickname;
        this.social = json.social;
        this.profileURL = json.profileURL;
        this.requestState = json.requestState;
        this.createdAt = json.createdAt;
        this.receivedCount = json.receivedCount;
        this.sentCount = json.sentCount;
    }

    public toString(): String {
        return `id: ${this.id}\n
        nickanme: ${this.nickname}\n
        social: ${this.social}\n
        profile_url: ${this.profileURL}\n
        received_count: ${this.receivedCount}\n
        sent_count: ${this.sentCount}\n
        requestState: ${this.requestState}`;
    }
}

export class Location {
    addr: String;
    name: String;
    latitude: Number;
    longitude: Number;

    constructor(json: any) {
        this.addr = json.addr;
        this.name = json.name;
        this.latitude = json.latitude;
        this.longitude = json.longitude;
    }
}

export enum State {
    WAIT = "wait", // 수락 대기중
    SENT = "sent", // 친구 요청 보냄
    FRIEND = "friend",
    NONE = "none"
}

export class ResponseContainer<T> {
    data: T;
    error: String;

    constructor(data: T, error: String) {
        this.data = data;
        this.error = error;
    }
}