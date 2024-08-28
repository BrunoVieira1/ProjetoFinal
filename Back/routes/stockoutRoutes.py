from controllers.stockoutController import stockout_controller

def stockout_routes(app):
    app.route('/stockout', methods=['POST', 'GET', 'PUT', 'DELETE'])(stockout_controller)
