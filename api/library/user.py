from flask import request
from .model import User
from .extension import db


def add_user():
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']
    try:
        new_user = User(name, email, password)
        db.session.add(new_user)
        db.session.commit()
        return request.json
    except:
        print('ERROR')