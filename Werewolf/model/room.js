export class Room {
    constructor(id, title, owner, size, lock, password) {
        this.title = title;
        this.owner = owner,
            this.size = size;
        this.lock = lock;
        this.password = password;
        this.id = id
    }
}