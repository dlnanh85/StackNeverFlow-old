from flask import Blueprint, request
from .blog import read_all_blog, add_blog, edit_blog
from .user import add_user


api = Blueprint('api', __name__, url_prefix='/api')


@api.route('/user', methods=['POST'])
def user():
    return add_user()


@api.route('/blog', methods=['GET', 'POST'])
def blog():
    if request.method == 'GET':
        return read_all_blog()
    elif request.method == 'POST':
        return add_blog()


@api.route('/blog/<int:blog_id>', methods=['PUT', 'DELETE'])
def blog_change(blog_id):
    if request.method == 'PUT':
        return edit_blog(blog_id)