from flask import Blueprint
from .user import add_user


api = Blueprint('api', __name__, url_prefix='/api')


@api.route('/user', methods=['POST'])
def user():
    return add_user()