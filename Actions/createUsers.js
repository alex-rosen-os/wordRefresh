// const fakeButton = document.querySelector(".fakeBtn");
// const container = document.querySelector(".users");


const getUser = async () => {
  // const users = {
  //   firstName: fakeData.firstName.value,
  //   lastName: fakeData.lastName.value,
  //   email: fakeData.email.value,
  // };

  // const response = await fetch("http://localhost:3000/users", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(users),
  // });
  // return response;

  const uri = "http://localhost:3000/users";
  const res = await fetch(uri);
  const users = await res.json();
  console.log(users);
};

window.addEventListener('DOMContentLoaded',()=> getUser())

// function printUser(e) {

//   e.preventDefault();
//   const getU = getUser;

//   const template = '';
//   template+= `
//   <div>${getU.email}</div>`

//   return users.innerHTML = template;

// }

// fakeButton.addEventListener("click", getUser );
