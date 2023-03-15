// Redirect to item
blogItems = document.querySelectorAll('.blog-item')

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
nav = document.querySelector('nav')
navButton = document.querySelector('.ti-menu')

if (window.innerWidth <= 1023) {
    isNavShown = false
    toggleNav(isNavShown)

    navButton.addEventListener('click', (event) => {
        isNavShown = isNavShown? false : true
        toggleNav(isNavShown)
        event.stopPropagation()
    })

    function toggleNav(isNavShown) {
        if (!isNavShown) 
            nav.classList.add('hidden')
        else
            nav.classList.remove('hidden')
    }

    // Exit nav by touching anywhere else
    body = document.querySelector('body')

    body.addEventListener('click', () => {
        if (isNavShown) {
            isNavShown = false
            toggleNav(isNavShown)
        }
    })
}
