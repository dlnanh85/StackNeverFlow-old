/* MODULES FOR BLOG/TAG CRUD INTERACTION WITH RESTAPI */


const blogApi = "http://localhost:3000/blogs";
const tagApi = "http://localhost:3000/tags";


// BLOG
function readBlog(callback) {
    Promise.all([fetch(blogApi), fetch(tagApi)])
        .then((responses) => {
            return Promise.all(responses.map((response) => response.json()))
        })
        .then(callback);
}


function createBlog(data, callback) {
    fetch(blogApi, {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(callback);
}


function updateBlog(data, blogId, callback) {
    console.log(data, blogId);
    fetch(blogApi + '/' + blogId, {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(callback);
}


function deleteBlog(blogId, callback) {
    fetch(blogApi + '/' + blogId, {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(callback);
}


// TAG
function readTag(callback) {
    fetch(tagApi)
        .then(response => response.json())
        .then(callback);
}


function createTag(data, callback) {
    fetch(tagApi, {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(callback);
}


function updateTag(data, tagId, callback) {
    fetch(tagApi + '/' + tagId, {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(callback);
}


function deleteTag(tagId, callback) {
    fetch(tagApi + '/' + tagId, {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(callback);
}


export {blogApi, tagApi, readBlog, createBlog, updateBlog, deleteBlog, readTag, createTag, updateTag, deleteTag}