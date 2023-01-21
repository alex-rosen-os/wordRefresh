const fakeButton = document.querySelector(".fakeBtn");
const container = document.querySelector(".users");

const getUser = async () => {
  const uri = "http://localhost:3000/users";
  const res = await fetch(uri);
  const users = await res.json();
  console.log(users);

  let template = "";

  users.forEach((user) => {
    template += `
    <div>
    ${user.email}
    </div>

    `;
  });
  container.innerHTML = template;
};

fakeButton.addEventListener("click", getUser);
