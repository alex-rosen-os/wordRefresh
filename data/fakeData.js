// import {faker} from '@faker-js/faker'
const { faker } = require("@faker-js/faker");

 function /* Generating 50 users with random data. */
 generateUsers() {
  var users = [];

  for (var id = 0; id < 50; id++) {
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

/* Exporting the function `generateUsers` so that it can be used in other files. */
module.exports = generateUsers;



