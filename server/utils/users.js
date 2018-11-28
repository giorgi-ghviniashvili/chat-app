class Users {
  constructor () {
    this.users = []
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    var user = this.getUser(id);
    if (user) {
      this.users = this.users.filter(x => x.id !== id);
    }
    return user;
  }
  getUser (id) {
    return this.users
      .filter(x => x.id === id)[0];
  }
  getUsersList (room) {
    return this.users
      .filter(x => x.room === room)
      .map(x => x.name);
  }
}

module.exports = {Users};
