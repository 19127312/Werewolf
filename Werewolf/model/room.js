export class Room {
    constructor(id, title, owner, sizePlayer, lock, password) {
        this.title = title;
        this.owner = owner,
            this.sizePlayer = sizePlayer;
        this.lock = lock;
        this.password = password;
        this.id = id
    }
}