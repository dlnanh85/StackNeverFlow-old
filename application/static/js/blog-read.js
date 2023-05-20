import { readBlog } from "./module/crud.js";


function start() {
    readBlog();
}

start();


function renderBlogRead(datas) {
    let blogs = datas[0];

    let tags = datas[1];

    
}