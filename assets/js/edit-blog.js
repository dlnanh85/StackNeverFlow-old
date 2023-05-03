import { readBlog, updateBlog } from "./module/crud.js";
import { handleTagInput, handleForm } from "./module/edit-blog-module.js";


function start() {
    readBlog(handleBlogEdit);
    handleForm("blog-edit", updateBlog);
}

start();

function handleBlogEdit(datas) {
    let INDEX = 1;

    let blogCurrent = datas[0][INDEX];
    
    let tags = datas[1];
    
    let form = document.forms['blog-edit'];
    
    for (let index in form) {
        if (form.hasOwnProperty(index) && form[index].name) {
            form[index].value = blogCurrent[form[index].name];
        }
    }
    

    handleTagInput(
        tags.filter((tag) => !blogCurrent['tag-ids'].includes(tag['id'])),
        tags.filter((tag) => blogCurrent['tag-ids'].includes(tag['id']))
    );
}