from controllers.stockinController import stockin_controller

def stockin_routes(app):
    app.route('/stockin', methods=['POST', 'GET', 'PUT', 'DELETE'])(stockin_controller)
