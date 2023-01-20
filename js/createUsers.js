const fakeButton = document.querySelector(".fakeBtn");
const container = document.querySelector(".users");
const { fakeData } = require("./fakeData");

console.log(fakeData);
const creatUser = async (e) => {
  e.preventDefault()

  const user = {
    firstName: fakeData.firstName.value,
    lastName: fakeData.lastName.value,
    email: fakeData.email.value,
  };

  const response = await fetch("http://localhost:3000/users", {
  method: "GET",
  headers:{
   'Content-Type': 'application/json'
  },
  body: JSON.stringify(user)

})
return response;
};

fakeButton.addEventListener("click", creatUser);
