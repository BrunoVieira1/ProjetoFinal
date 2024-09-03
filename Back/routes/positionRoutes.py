from controllers.positionController import position_controller

def position_routes(app):
    app.route('/position', methods=['POST', 'GET', 'PUT', 'DELETE'])(position_controller)
