This is my first web project:

This is a web project, for my personal use (and for practicing web programming, of course). This web is a blog-like website, where I can store all my encountered problem, and its solution I found on Stack Overflow (or anywhere), using my tone, my understanding of the solution. So that I can easily find it, whenever I encounter it again.


What may include?
- A page to list all the blogs
- A page to serve each blog
- Login screen
- Register screen

Feature?
- Search for blog
- Authorization system (login/register)
- Create/edit blogs
    + Author (automated)
    + Title
    + Content
        * Problem
        * Solution
        => Should allow user to input images, code blocks, and basic text format
    + Reference (URL to Stackoverflow + Which specific response solved the problem)
    + Tags/categorize (act as Notion's selection)
    + Date created (automated)
    -> Allow input at most 1 field at a time, from top to bottom (using JS to store an array of input elements, and move around these elements)


Future development: 
- Admin control page
    + Add, remove users
    + Add, remove blogs
- Set privacy for blogs (public or private...)

TODO list 4/5/2023
- Finish CRUD for blogs - STILL HAVE blog-read
- Apply Flask



TODO list further:
- CRUD for Tags
- Form authentication
- User session