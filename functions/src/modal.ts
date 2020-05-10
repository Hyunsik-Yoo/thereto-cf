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

export class ResponseContainer<T> {
    data: T;
    error: String;

    constructor(data: T, error: String) {
        this.data = data;
        this.error = error;
    }
}