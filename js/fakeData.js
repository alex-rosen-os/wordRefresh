// import {faker} from '@faker-js/faker'
const { faker } = require("@faker-js/faker");


function generateUsers() {
  var users = [];

  for (var id = 0; id < 5; id++) {
    var firstName = faker.name.firstName();
    var lastName = faker.name.lastName();
    var email = faker.internet.email();
    users.push({
      id: id,
      first_name: firstName,
      last_name: lastName,
      email: email,
    });
  }

 return { users }; 
}

module.exports = generateUsers;



