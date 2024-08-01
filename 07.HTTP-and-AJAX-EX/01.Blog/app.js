function attachEvents() {
    const mainURL = "http://localhost:3030/jsonstore/blog/";

    const loadPostsBtn = document.getElementById("btnLoadPosts");
    const postsField = document.getElementById("posts");
    const viewBtn = document.getElementById("btnViewPost");
    const postTitle = document.getElementById("post-title");
    const postBody = document.getElementById("post-body");
    const postComments = document.getElementById("post-comments");

    let allPosts = {};

    loadPostsBtn.addEventListener("click", async () => {

        postsField.innerHTML = '';

        const getAllPosts = await fetch(mainURL + 'posts');
        allPosts = await getAllPosts.json();

        for (const [id, postObj] of Object.entries(allPosts)) {

            const option = document.createElement("option");
            option.value = id;
            option.textContent = postObj.title;
            postsField.appendChild(option);
        }

    });

    viewBtn.addEventListener("click", async () =>{

        postBody.innerHTML = '';
        postComments.innerHTML = '';

        const postID = postsField.value;

        postTitle.textContent = allPosts[postID].title;
        postBody.textContent = allPosts[postID].body;

        const getAllComments = await fetch(mainURL + 'comments');
        const allComments = await getAllComments.json();

        for (const comment of Object.values(allComments).filter(c => c.postId === postID)) {
            
            const li = document.createElement("li");
            li.id = comment.id;
            li.textContent = comment.text;
            postComments.appendChild(li);
        }

    });
}

attachEvents();