// Redirect to item
blogItems = document.querySelectorAll('.blog-item')
blogTitles = document.querySelectorAll('.blog-item .blog-info p')

blogItems.forEach(blogitem => {
    blogitem.addEventListener('click', (event) => {
        event.preventDefault()
        url = blogitem.getAttribute('data-url')
        window.location.href = 'tmp.html'
    })
});

blogTags = document.querySelectorAll('.blog-tag a')

blogTags.forEach(tag => {
    tag.addEventListener('click', (event) => {
        event.stopPropagation()
    })
})

// Responsive navbar show/hide by button
nav = document.que