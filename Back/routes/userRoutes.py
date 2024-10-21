from flask import request, make_response
from controllers.userController import user_controller
from models.user import User

from controllers.reportController import download_pdf

def get_data():
    id = request.args.get("id")
    print(id)
    query = User.query
    query = query.filter_by(id=id).all()
    print(query)
    return [usuario.to_dict() for usuario in query]




def user_routes(app):
    app.route('/user', methods=['POST', 'GET', 'PUT', 'DELETE'])(user_controller)
    app.route('/user/auth', methods=['GET'])(get_data)
    app.route('/pdf', methods=['GET'])(download_pdf)