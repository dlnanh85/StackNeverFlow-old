import { readBlog, deleteBlog } from "./module/crud.js";

function start() {
    readBlog((data) => {
        renderBlogList(data);
        blogItemClicksHandle();
    });
}

start();


function renderBlogList(datas) {
    let blogs = datas[0];

    let tags = datas[1];

    blogs = blogs.map((blog) => {
        console.log(tags.filter);
        let blogTags = tags
            .filter((tag) => blog['tag-ids'].includes(tag.id))
            .map((tag) => {
                return `<a class="text-muted" href="#"> ${tag.name}</a>`
            })
            .join(',');

        return (`
            <div data-id="${blog['id']}" class="blog-item d-flex flex-column p-4 mb-3 shaded-bg">
                <div class="blog-info">
                    <img class="img-dominant-tech" src="./assets/img/html_logo.png" alt="">
                    <div class="blog-info-text">
                        <h1 class="blog-title">${blog.title}</h1>
                        <p class="tag text-muted">Tags: 
                            ${blogTags}
                        </p>
                    </div>
                </div>
                <div class="blog-shorten-content">    
                    <p>${blog.problem}</p>
                </div>
                <div class="blog-option">
                    <p class="option-button round-shape">&hellip;</p>
                    <div class="option-container hidden">
                        <a href="edit-blog.html">
                            <div data-option="edit" class="option-item px-3 py-2">Edit</div>
                        </a>
                        <a href="">
                            <div data-option="delete" class="option-item px-3 py-2">Delete</div>
                        </a>
                    </div>
                </div>
            </div>
        `);
    }).join('');
    
    
    document.querySelector('.blog-list').innerHTML = blogs;
}


// Redirect to item
function blogItemClicksHandle() {
    // ITEM CLICK
    document.querySelectorAll('.blog-item')
    .forEach(blogItem => {

        blogItem.onclick = (event) => {
            event.preventDefault();
            // url = blogItem.getAttribute('data-url')
            window.location.href = 'blog-read.html'
        }

        
        // TAG CLICK
        blogItem.querySelectorAll('.blog-tag a')
        .forEach(tag => {
            tag.onclick = (event) => {
                event.stopPropagation()
            }
        });


        // OPTION CLICK
        let option = blogItem.querySelector('.blog-option')

        // Handle option button
        option.querySelector('.option-button')
        .onclick = (event) => {
            event.stopPropagation();
            
            let optionContainer = option.querySelector('.option-container');
            if (optionContainer.classList.contains('hidden')) {
                optionContainer.classList.remove('hidden');
            }
            else {
                optionContainer.classList.add('hidden');
            }
            document.body.onclick = () => {
                if (!optionContainer.classList.contains('hidden')) {
                    optionContainer.classList.add('hidden');
                }
            }
        }
        // Handle option list
        let optionItems = option.querySelectorAll('.option-item');
        optionItems.forEach((item) => {
            item.onclick = (event) => {
                event.stopPropagation();
                event.preventDefault();

                if (item.getAttribute('data-option') === 'edit') {
                    window.location.href = 'edit-blog.html';
                }
                else if (item.getAttribute('data-option') === 'delete') {
                    deleteBlog(blogItem.getAttribute('data-id'), start);
                }
            }
        })
    });
}
