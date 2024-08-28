from controllers.userController import user_controller

def user_routes(app):
    app.route('/user', methods=['POST', 'GET', 'PUT', 'DELETE'])(user_controller)
