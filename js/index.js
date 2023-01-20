  const container = document.querySelector(".blogs");

const searchBox = document.querySelector(".search");

const renderPosts = async (term) => {
  let uri = "http://localhost:3000/posts";
  if (term) {
    uri += `?q=${term}`;
  }
  const res = await fetch(uri);
  const posts = await res.json();

  console.log(posts);

  let template = "";

  posts.forEach((post) => {
    template += `
        <div class ="post">
        <h2>${post.title}</h2>
        <p><small>${post.likes} likes </small></p>
        <p>${post.body.slice(0, 200)}</p>
        <a href="/jsonBlog/details.html?id=${post.id}">read more...</a>
        </div> 
     
    `;
  });

  container.innerHTML = template;
};

window.addEventListener("DOMContentLoaded", () => renderPosts());

const searchPosts = (e) => {
  e.preventDefault();
  renderPosts(searchBox.term.value.trim());
};

searchBox.addEventListener("submit",searchPosts)