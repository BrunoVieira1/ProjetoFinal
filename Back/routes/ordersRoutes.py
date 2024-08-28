from controllers.ordersController import orders_controller

def orders_routes(app):
    app.route('/orders', methods=['POST', 'GET', 'PUT', 'DELETE'])(orders_controller)
