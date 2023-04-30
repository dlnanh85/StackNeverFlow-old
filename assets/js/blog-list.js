const blogApi = "http://localhost:3000/blogs";
const tagApi = "http://localhost:3000/tags";

function start() {
    handleBlogList(renderBlogList);
}

start();


function handleBlogList(callback) {
    Promise.all([fetch(blogApi), fetch(tagApi)])
        .then((responses) => {
            return Promise.all(responses.map((response) => response.json()))
        })
        .then((datas) => {
            callback(datas)
        })
}

function renderBlogList(datas) {
    let blogs = datas[0];

    let tags = datas[1];

    
    let blogsHtml = blogs.map((blog) => {
        let tagsHtml = tags
            .filter((tag) => blog['tag-id'].includes(tag.id))
            .map((tag) => {
                return `<a class="text-muted" href="#">${tag.name}</a>`
            })
            .join(',');

        return (`
            <div class="blog-item d-flex flex-column p-4 mb-3 shaded-bg">
                <div class="blog-info">
                    <img class="img-dominant-tech" src="./assets/img/html_logo.png" alt="">
                    <div class="blog-info-text">
                        <h1 class="blog-title">${blog.title}</h1>
                        <p class="tag text-muted">Tags: 
                            ${tagsHtml}
                        </p>
                    </div>
                </div>
                <div class="blog-shorten-content">    
                    <p>${blog.problem}</p>
                </div>
            </div>
        `);
    }).join('');
    
    
    let blogListContainer = document.querySelector('.blog-list');
    blogListContainer.innerHTML = blogsHtml;
}