var expect = require('expect');

var {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: 1,
      name: 'Mike',
      room: 'Node course'
    }, {
      id: 2,
      name: 'Jan',
      room: 'Vue course'
    }, {
      id: 3,
      name: 'Mir',
      room: 'Node course'
    }];
  });


  it('Should add a new user', () => {
    var user = {
      id: 1,
      name: 'Giorgi',
      room: 'Node course'
    };

    var users = new Users();
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(resUser).toEqual(user);
  })

  it('Should return names of users within the room', () => {
    var usersList = users.getUsersList('Node course')

    expect(usersList).toEqual(['Mike','Mir']);
  })

})
