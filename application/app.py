from flask import Flask, render_template, redirect


app = Flask(__name__)


@app.route('/')
def index():
    return redirect('/blogs')


@app.route('/blogs')
def blog_list():
    return render_template('blog-list.html')


@app.route('/blog/<id>')
def blog_read(id):
    return render_template('blog-read.html')


@app.route('/blog/create')
def create_blog():
    return render_template('create-blog.html')


@app.route('/blog/edit')
def edit_blog():
    return render_template('edit-blog.html')


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/register')
def register():
    return render_template('register.html')


@app.route('/profile')
def profile():
    return render_template('profile.html')