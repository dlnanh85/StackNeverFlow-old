from flask import request, Flask, json, make_response
from .model import dbsession, User


def add_user():
    data = request.json
    try:
        if not (data and 'name' in data and 'email' in data and 'password' in data):
            pass
        name = request.json['name']
        email = request.json['email']
        password = request.json['password']
        new_user = User(name, email, password)
        dbsession.add(new_user)
        dbsession.commit()


        response = make_response(data)
        response.status_code = 201
        return response
    except:
        print('ERROR')
        return 'ERROR'