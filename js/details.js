
const id = new URLSearchParams(window.location.search).get('id');


const Pagecontent = document.querySelector(".details");



const getContent = async () => {
  const uriContent = ("http://localhost:3000/posts/" + id);
  const res = await fetch(uriContent);
  const postContent = await res.json();

  console.log(postContent);

  let template = " ";

    template += `
        <h1> ${postContent.title}</h1>
        <p>${postContent.body }</p> 
        `;
      

  Pagecontent.innerHTML = template;
};



window.addEventListener("DOMContentLoaded", () => getContent());


const deleteButton = document.querySelector('.deleteButton')
console.log(deleteButton ); 

const deletePost = async (e) => {
  e.preventDefault()
   await fetch("http://localhost:3000/posts/" + id, {
    method: "DELETE",
  })
  window.location.replace('/jsonBlog/index.html')
}

deleteButton.addEventListener("click", deletePost)