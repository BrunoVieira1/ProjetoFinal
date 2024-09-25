from flask import request
from controllers.userController import user_controller
from models.user import User

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