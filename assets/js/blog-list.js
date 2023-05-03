

function start() {
    readBlog(renderBlogList);
}

start();




function renderBlogList(datas) {
    let blogs = datas[0];

    let tags = datas[1];

    
    let blogsHtml = blogs.map((blog) => {
        let tagsHtml = tags
            .filter((tag) => blog['tag-ids'].includes(tag.id))
            .map((tag) => {
                return `<a class="text-muted" href="#"> ${tag.name}</a>`
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
                <div class="blog-option">
                    <p class="option-button round-shape">&hellip;</p>
                    <div class="option-container hidden">
                        <a href="edit-blog.html">
                            <div class="option-item px-3 py-2">Edit</div>
                        </a>
                        <a href="">
                            <div class="option-item px-3 py-2">Delete</div>
                        </a>
                    </div>
                </div>
            </div>
        `);
    }).join('');
    
    
    let blogListContainer = document.querySelector('.blog-list');
    blogListContainer.innerHTML = blogsHtml;

    blogItemClicksHandle();
}


// Redirect to item
function blogItemClicksHandle() {
    
    // Click on item to view blog
    let blogItems = document.querySelectorAll('.blog-item')
    blogItems.forEach(blogitem => {
        blogitem.onclick = (event) => {
            event.preventDefault();
            url = blogitem.getAttribute('data-url')
            window.location.href = 'blog-read.html'
        }});
    
        
    // Click on tags to view tags
    let blogTags = document.querySelectorAll('.blog-tag a')
    blogTags.forEach(tag => {
        tag.onclick = (event) => {
            event.stopPropagation()
        }
    });

    // Click on option button to open option
    let blogOptions = document.querySelectorAll('.blog-option');
    blogOptions.forEach((option) => {
        // Handle option button
        let optionButton = option.querySelector('.option-button');
        optionButton.onclick = (event) => {
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
            }
        })
    })
}
