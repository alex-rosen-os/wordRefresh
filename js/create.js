const form = document.querySelector("form");

const createPost = async (e) => {
  e.preventDefault();

  const doc = {
    title: form.title.value,
    body: form.body.value,
    likes: 0,
  };

  await fetch("http://localhost:3000/posts", {
    method: "POST",
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(doc),
  });

window.location.replace('/jsonBlog/index.html')
};
form.addEventListener("submit", createPost);
