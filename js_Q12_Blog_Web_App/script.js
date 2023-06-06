
document.addEventListener("DOMContentLoaded",(e) => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) => {
        let container = document.getElementById("container")
        json.forEach(element => {
            let blog = `
                <div class="blog" id=${element.id}>
                    <div class="blog_header">
                        <h1 class="blog_title">${element.title}</h1>
                        <button class="blog_delete_btn" onclick="deletePost(${element.id})">Delete</button>
                    </div>
                    <div class="blog_body">
                        ${element.body}
                    </div>
                </div>
            `
            container.innerHTML += blog
        });
    })
})

const createPost = e => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: e.target.children[1].value,
        body: e.target.children[3].value,
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => response.json())
    .then((json) => {
        let container = document.getElementById("container")
        const firstchild = container.firstChild
        let blog = document.createElement("div")
        blog.innerHTML = `
        <div class="blog" id=${json.id}>
            <div class="blog_header">
                <h1 class="blog_title">${json.title}</h1>
                <button class="blog_delete_btn" onclick="deletePost(${json.id})">Delete</button>
            </div>
            <div class="blog_body">
                ${json.body}
            </div>
        </div>
    `


    container.insertBefore(blog,firstchild)
    openCreateForm(false)
    });
}

const deletePost = id => {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'DELETE',
    });

    if(document.getElementById(id))
        document.getElementById(id).remove()
}

const openCreateForm = (isOpen) => {
    if(isOpen){
        document.getElementById("form_container").style.display = "flex"
    }else{
        document.getElementById("form_container").style.display = "none"
    }
}