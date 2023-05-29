from flask import make_response, jsonify, request
from sqlalchemy import select, func
from .model import dbsession, Blog, Tag, Tag_Blog, User


def read_all_blog():
    blogs_query = dbsession.query(Blog).all()
    blogs = list(map(link_tag_to_blog, blogs_query))

    return jsonify(blogs)


def link_tag_to_blog(blog_query):
    blog_id = blog_query.id
    tag_ids_query = dbsession.query(Tag_Blog).filter(Tag_Blog.blog_id == blog_id).all()
    tag_ids = list(map(lambda query: query.tag_id, tag_ids_query))
    blog = blog_query.__dict__
    del blog['_sa_instance_state']
    blog['tag_ids'] = tag_ids
    return blog


def add_blog():
    data = request.json
    try:
        author_id = data['author_id']
        title = data['title']
        problem = data['problem']
        solution = data['solution']
        reference = data['reference']
        tag_ids = data['tag_ids']

        # ADD BLOG TO DATABASE
        new_blog = Blog(author_id, title, problem, solution, reference)
        dbsession.add(new_blog)

        # HANDLE tag_ids
        for tag in tag_ids:
            new_tag_blog = Tag_Blog(tag, get_blog_count())
            dbsession.add(new_tag_blog)

        dbsession.commit()

        response = make_response(data)
        response.status_code = 201

    except:
        response = make_response('Bad request')
        response.status_code = 400

    return response


def get_blog_count():
    return dbsession.query(func.max(Blog.id)).first()[0]


def edit_blog(blog_id):
    data = request.json

    author_id = data['author_id']
    title = data['title']
    problem = data['problem']
    solution = data['solution']
    reference = data['reference']
    tag_ids = data['tag_ids']

    blog = dbsession.query(Blog).filter(Blog.id == blog_id).first()

    blog.author_id = author_id
    blog.title = title
    blog.problem = problem
    blog.solution = solution
    blog.reference = reference

    # HANDLE tag_ids
    tag_ids_query = dbsession.query(Tag_Blog).filter(Tag_Blog.blog_id == blog_id).delete()
    for tag in tag_ids:
        new_tag_blog = Tag_Blog(tag, blog_id)
        dbsession.add(new_tag_blog)
    
    dbsession.commit()

    response = make_response(data)
    response.status_code = 200

    return response

