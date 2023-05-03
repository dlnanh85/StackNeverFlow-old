import { activeItems, handleTextInput, handleTagInput, handleForm } from "./module/create-blog.js";
import { createBlog } from "./module/crud.js";


function start() {
    activeItems(0);
    handleTextInput();
    handleTagInput();
    handleForm("blog-create", createBlog);
}


start();