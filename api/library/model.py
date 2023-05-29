from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from dataclasses import dataclass


db = SQLAlchemy()
dbsession = db.session


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password


@dataclass
class Blog(db.Model):
    id:int = db.Column(db.Integer, primary_key=True)
    author_id:int = db.Column(db.Integer, ForeignKey('user.id'))
    title:str = db.Column(db.String(1000), nullable=False)
    problem:str = db.Column(db.String(1000), nullable=False)
    solution:str = db.Column(db.String(1000), nullable=False)
    reference:str = db.Column(db.String(1000), nullable=False)
    
    def __init__(self, author_id, title, problem, solution, reference):
        self.author_id = author_id
        self.title = title
        self.problem = problem
        self.solution = solution
        self.reference = reference


class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)


class Tag_Blog(db.Model):
    tag_id = db.Column(db.Integer, ForeignKey('tag.id'), primary_key=True)
    blog_id = db.Column(db.Integer, ForeignKey('blog.id'), primary_key=True)

    def __init__(self, tag_id, blog_id):
        self.tag_id = tag_id
        self.blog_id = blog_id