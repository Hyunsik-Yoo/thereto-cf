export class User {
    id: String;
    nickname: String;
    social: String;
    profilURL: String;
    receivedCount: Number;
    sentCount: Number;

    constructor(json: any) {
        this.id = json.id;
        this.nickname = json.nickname;
        this.social = json.social;
        this.profilURL = json.profileURL;
        this.receivedCount = json.receivedCount;
        this.sentCount = json.sentCount;
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